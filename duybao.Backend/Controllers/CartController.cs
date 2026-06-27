using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using duybao.data;
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy user ID hiện tại từ cookie
        /// </summary>
        private int GetUserId()
        {
            var username = User.FindFirstValue(ClaimTypes.Name);
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            return user?.Id ?? 0;
        }

        /// <summary>
        /// GET /api/Cart — Lấy toàn bộ giỏ hàng của user hiện tại
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userId = GetUserId();
            if (userId == 0)
                return Unauthorized(new { message = "Không tìm thấy người dùng" });

            var items = await _context.CartItems
                .Where(c => c.UserId == userId)
                .Include(c => c.Product)
                .OrderByDescending(c => c.AddedAt)
                .Select(c => new
                {
                    c.Id,
                    c.ProductId,
                    c.Quantity,
                    c.AddedAt,
                    Product = c.Product != null ? new
                    {
                        c.Product.Id,
                        c.Product.Name,
                        c.Product.Price,
                        c.Product.ImageUrl,
                        c.Product.Brand,
                        c.Product.Sku,
                        c.Product.StockQuantity
                    } : null
                })
                .ToListAsync();

            return Ok(items);
        }

        /// <summary>
        /// POST /api/Cart — Thêm sản phẩm vào giỏ hàng (hoặc tăng số lượng nếu đã có)
        /// Body: { productId, quantity }
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDTO input)
        {
            var userId = GetUserId();
            if (userId == 0)
                return Unauthorized(new { message = "Không tìm thấy người dùng" });

            if (input == null || input.ProductId <= 0)
                return BadRequest(new { message = "Dữ liệu sản phẩm không hợp lệ" });

            // Kiểm tra sản phẩm tồn tại
            var product = await _context.Products.FindAsync(input.ProductId);
            if (product == null)
                return NotFound(new { message = "Không tìm thấy sản phẩm" });

            var quantity = input.Quantity > 0 ? input.Quantity : 1;

            // Kiểm tra đã có trong giỏ chưa
            var existing = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == input.ProductId);

            if (existing != null)
            {
                existing.Quantity += quantity;
                existing.AddedAt = DateTime.Now;
            }
            else
            {
                _context.CartItems.Add(new CartItem
                {
                    UserId = userId,
                    ProductId = input.ProductId,
                    Quantity = quantity,
                    AddedAt = DateTime.Now
                });
            }

            await _context.SaveChangesAsync();

            var totalItems = await _context.CartItems
                .Where(c => c.UserId == userId)
                .SumAsync(c => c.Quantity);

            return Ok(new { message = "Đã thêm vào giỏ hàng!", totalItems });
        }

        /// <summary>
        /// PUT /api/Cart/{id} — Cập nhật số lượng
        /// Body: { quantity }
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuantity(int id, [FromBody] UpdateQuantityDTO input)
        {
            var userId = GetUserId();
            if (userId == 0)
                return Unauthorized(new { message = "Không tìm thấy người dùng" });

            var item = await _context.CartItems
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (item == null)
                return NotFound(new { message = "Không tìm thấy sản phẩm trong giỏ hàng" });

            if (input.Quantity < 1)
                return BadRequest(new { message = "Số lượng phải lớn hơn 0" });

            item.Quantity = input.Quantity;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã cập nhật số lượng", item.Id, item.Quantity });
        }

        /// <summary>
        /// DELETE /api/Cart/{id} — Xóa một sản phẩm khỏi giỏ
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var userId = GetUserId();
            if (userId == 0)
                return Unauthorized();

            var item = await _context.CartItems
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (item == null)
                return NotFound(new { message = "Không tìm thấy sản phẩm trong giỏ hàng" });

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xóa khỏi giỏ hàng" });
        }

        /// <summary>
        /// DELETE /api/Cart — Xóa toàn bộ giỏ hàng
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> ClearCart()
        {
            var userId = GetUserId();
            if (userId == 0)
                return Unauthorized();

            var items = await _context.CartItems
                .Where(c => c.UserId == userId)
                .ToListAsync();

            _context.CartItems.RemoveRange(items);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xóa toàn bộ giỏ hàng" });
        }

        /// <summary>
        /// POST /api/Cart/merge — Gộp giỏ hàng localStorage vào backend (sau khi login)
        /// Body: [ { productId, quantity }, ... ]
        /// </summary>
        [HttpPost("merge")]
        public async Task<IActionResult> MergeCart([FromBody] List<MergeCartItemDTO> items)
        {
            var userId = GetUserId();
            if (userId == 0)
                return Unauthorized(new { message = "Không tìm thấy người dùng" });

            if (items == null || items.Count == 0)
                return Ok(new { message = "Giỏ hàng trống, không cần gộp", totalItems = 0 });

            foreach (var item in items)
            {
                var existing = await _context.CartItems
                    .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == item.ProductId);

                if (existing != null)
                {
                    existing.Quantity += item.Quantity;
                    existing.AddedAt = DateTime.Now;
                }
                else
                {
                    _context.CartItems.Add(new CartItem
                    {
                        UserId = userId,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        AddedAt = DateTime.Now
                    });
                }
            }

            await _context.SaveChangesAsync();

            var totalItems = await _context.CartItems
                .Where(c => c.UserId == userId)
                .SumAsync(c => c.Quantity);

            return Ok(new { message = "Đã đồng bộ giỏ hàng!", totalItems });
        }
    }

    // ─── DTOs ───────────────────────────────────────────────────────
    public class AddToCartDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; } = 1;
    }

    public class UpdateQuantityDTO
    {
        public int Quantity { get; set; }
    }

    public class MergeCartItemDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
