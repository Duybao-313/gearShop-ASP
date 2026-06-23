using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using duybao.data;
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// API: Lấy toàn bộ đơn hàng (yêu cầu Admin)
        /// GET: /api/Orders
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _context.Orders
                .Include(o => o.Customer)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new
                {
                    o.Id,
                    o.OrderDate,
                    o.Status,
                    o.Notes,
                    o.CustomerId,
                    Customer = o.Customer != null ? new { o.Customer.Id, o.Customer.FullName, o.Customer.Email, o.Customer.Phone } : null
                })
                .ToListAsync();

            return Ok(orders);
        }

        /// <summary>
        /// API: Lấy chi tiết đơn hàng theo ID (yêu cầu Admin)
        /// GET: /api/Orders/{id}
        /// </summary>
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails!)
                    .ThenInclude(od => od.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound(new { message = "Không tìm thấy đơn hàng" });

            return Ok(new
            {
                order.Id,
                order.OrderDate,
                order.Status,
                order.Notes,
                order.CustomerId,
                Customer = order.Customer != null ? new { order.Customer.Id, order.Customer.FullName, order.Customer.Email, order.Customer.Phone } : null,
                OrderDetails = order.OrderDetails != null ? order.OrderDetails.Select(od => new
                {
                    od.Id,
                    od.ProductId,
                    od.Quantity,
                    od.UnitPrice,
                    Product = od.Product != null ? new { od.Product.Id, od.Product.Name, od.Product.ImageUrl } : null
                }) : null
            });
        }

        /// <summary>
        /// API: Tiếp nhận đơn đặt hàng từ giỏ hàng FrontEnd gửi lên
        /// POST: /api/Orders
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderInputDTO input)
        {
            if (input == null)
            {
                return BadRequest(new { message = "Dữ liệu đơn hàng không hợp lệ" });
            }

            try
            {
                var newOrder = new Order
                {
                    OrderDate = DateTime.Now,
                    CustomerId = input.CustomerId,
                    Status = 0,
                    Notes = input.Notes
                };

                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();

                return StatusCode(201, new { 
                    message = "Đặt hàng thành công!", 
                    orderId = newOrder.Id 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi xử lý tạo đơn hàng ngầm", detail = ex.Message });
            }
        }

        /// <summary>
        /// API: Cập nhật trạng thái đơn hàng (yêu cầu Admin)
        /// PUT: /api/Orders/{id}/status
        /// Body: { "status": 1 }  // 0: Chờ duyệt, 1: Đang giao, 2: Đã xong
        /// </summary>
        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDTO input)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound(new { message = "Không tìm thấy đơn hàng" });

            if (input.Status < 0 || input.Status > 2)
                return BadRequest(new { message = "Trạng thái không hợp lệ. 0: Chờ duyệt, 1: Đang giao, 2: Đã xong" });

            order.Status = input.Status;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật trạng thái thành công", orderId = order.Id, status = order.Status });
        }
    }

    // LỚP DTO TRUNG GIAN ĐỂ HỨNG DỮ LIỆU TỪ FRONTEND TRUYỀN LÊN
    public class OrderInputDTO
    {
        public int CustomerId { get; set; }
        public string? Notes { get; set; }
    }

    // DTO cập nhật trạng thái đơn hàng
    public class UpdateStatusDTO
    {
        public int Status { get; set; }
    }
}
