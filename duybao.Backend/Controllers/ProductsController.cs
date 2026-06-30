using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using duybao.data;
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    // 1. Định nghĩa đường dẫn để gọi API. [controller] sẽ tự lấy tên là "Products"
    // Khi chạy, địa chỉ truy cập dữ liệu sẽ là: https://localhost:xxxx/api/products
    [Route("api/[controller]")]
    // 2. Đánh dấu đây là một API Controller để hệ thống hỗ trợ các tính năng tự động kiểm tra dữ liệu đầu vào
    [ApiController]
    // 3. API Controller phải kế thừa từ ControllerBase (thay vì kế thừa từ Controller như phân hệ MVC)
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // 4. Hàm khởi tạo (Constructor): "Tiêm" ngữ cảnh dữ liệu SQL Server vào để sử dụng
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Lấy toàn bộ sản phẩm (sắp xếp sản phẩm mới nhất lên đầu)
        //  GET:  /api/products
        // ──────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? categoryProductId)
        {
            IQueryable<Product> query = _context.Products
                .Include(p => p.CategoryProduct);

            // Lọc theo danh mục sản phẩm nếu có truyền query param
            if (categoryProductId.HasValue)
            {
                query = query.Where(p => p.CategoryProductId == categoryProductId.Value);
            }

            var products = await query
                .OrderByDescending(p => p.Id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.DiscountPercentage,
                    p.Rating,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.Images,
                    p.Brand,
                    p.Sku,
                    p.CategoryProductId,
                    CategoryProduct = p.CategoryProduct != null ? new { p.CategoryProduct.Id, p.CategoryProduct.Name } : null
                })
                .ToListAsync();

            return Ok(products);
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Tìm kiếm sản phẩm theo từ khóa
        //  GET:  /api/products/search?q=chuột
        // ──────────────────────────────────────────────────────────────
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string q)
        {
            if (string.IsNullOrWhiteSpace(q))
            {
                return Ok(new List<object>());
            }

            var keyword = q.Trim().ToLower();

            var products = await _context.Products
                .Include(p => p.CategoryProduct)
                .Where(p => p.Name.ToLower().Contains(keyword)
                         || p.Description.ToLower().Contains(keyword)
                         || p.Brand.ToLower().Contains(keyword))
                .OrderByDescending(p => p.Id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.DiscountPercentage,
                    p.Rating,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.Images,
                    p.Brand,
                    p.Sku,
                    p.CategoryProductId,
                    CategoryProduct = p.CategoryProduct != null ? new { p.CategoryProduct.Id, p.CategoryProduct.Name } : null
                })
                .ToListAsync();

            return Ok(products);
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Lấy sản phẩm theo danh mục sản phẩm
        //  GET:  /api/products/categoryproduct/{categoryProductId}
        // ──────────────────────────────────────────────────────────────
        [HttpGet("categoryproduct/{categoryProductId}")]
        public async Task<IActionResult> GetByCategoryProduct(int categoryProductId)
        {
            var products = await _context.Products
                .Where(p => p.CategoryProductId == categoryProductId)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.StockQuantity
                })
                .ToListAsync();

            return Ok(products);
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Lấy chi tiết sản phẩm theo ID
        //  GET:  /api/products/{id}
        // ──────────────────────────────────────────────────────────────
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var product = await _context.Products
                .Include(p => p.CategoryProduct)
                .Include(p => p.Reviews)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm này trong hệ thống" });
            }

            return Ok(new
            {
                product.Id,
                product.Name,
                product.Description,
                product.Price,
                product.DiscountPercentage,
                product.Rating,
                product.StockQuantity,
                product.ImageUrl,
                product.Images,
                product.Brand,
                product.Sku,
                product.CategoryProductId,
                CategoryProduct = product.CategoryProduct != null ? new { product.CategoryProduct.Id, product.CategoryProduct.Name } : null,
                Reviews = product.Reviews != null
                    ? product.Reviews.Select(r => new
                    {
                        r.Id,
                        r.ProductId,
                        r.Rating,
                        r.Comment,
                        r.ReviewerName,
                        r.CreatedDate
                    })
                    : null
            });
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Tạo sản phẩm mới (yêu cầu đăng nhập Admin)
        //  POST: /api/products
        // ──────────────────────────────────────────────────────────────
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrWhiteSpace(product.Name))
                return BadRequest(new { message = "Tên sản phẩm không được để trống" });

            if (product.Price <= 0)
                return BadRequest(new { message = "Giá sản phẩm phải lớn hơn 0" });

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return StatusCode(201, new
            {
                product.Id,
                product.Name,
                product.Price,
                product.CategoryProductId
            });
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Cập nhật sản phẩm (yêu cầu đăng nhập Admin)
        //  PUT:  /api/products/{id}
        // ──────────────────────────────────────────────────────────────
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] Product product)
        {
            if (id != product.Id)
                return BadRequest(new { message = "ID sản phẩm không khớp" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = await _context.Products.FindAsync(id);
            if (existing == null)
                return NotFound(new { message = "Không tìm thấy sản phẩm" });

            // Cập nhật các trường
            existing.Name = product.Name;
            existing.Description = product.Description;
            existing.Price = product.Price;
            existing.StockQuantity = product.StockQuantity;
            existing.ImageUrl = product.ImageUrl;
            existing.CategoryProductId = product.CategoryProductId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Xóa sản phẩm (yêu cầu đăng nhập Admin)
        //  DELETE: /api/products/{id}
        // ──────────────────────────────────────────────────────────────
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound(new { message = "Không tìm thấy sản phẩm" });

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
