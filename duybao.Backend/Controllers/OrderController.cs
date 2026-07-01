using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using duybao.data;
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    [Authorize(Roles = "Admin")]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// INDEX — Danh sách tất cả đơn hàng (có filter & phân trang)
        /// GET: /Order
        /// </summary>
        public async Task<IActionResult> Index(string? search, int? status, int page = 1, int pageSize = 10)
        {
            var query = _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails!)
                    .ThenInclude(od => od.Product)
                .AsQueryable();

            // Lọc theo trạng thái (nếu có)
            if (status.HasValue && status.Value >= 0 && status.Value <= 3)
            {
                query = query.Where(o => o.Status == status.Value);
            }

            // Tìm kiếm theo tên khách hàng, email, hoặc ID đơn hàng
            if (!string.IsNullOrWhiteSpace(search))
            {
                if (int.TryParse(search, out int orderId))
                {
                    query = query.Where(o => o.Id == orderId);
                }
                else
                {
                    query = query.Where(o =>
                        (o.Customer != null && o.Customer.FullName.Contains(search)) ||
                        (o.Customer != null && o.Customer.Email.Contains(search)) ||
                        (o.Customer != null && o.Customer.Phone != null && o.Customer.Phone.Contains(search))
                    );
                }
            }

            // Tổng số đơn để tính phân trang
            var totalOrders = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalOrders / (double)pageSize);

            // Phân trang
            var orders = await query
                .OrderByDescending(o => o.OrderDate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(o => new OrderListVM
                {
                    Id = o.Id,
                    OrderDate = o.OrderDate,
                    Status = o.Status,
                    Notes = o.Notes,
                    CustomerName = o.Customer != null ? o.Customer.FullName : "Khách lẻ",
                    CustomerEmail = o.Customer != null ? o.Customer.Email : "",
                    CustomerPhone = o.Customer != null ? o.Customer.Phone : "",
                    TotalItems = o.OrderDetails != null ? o.OrderDetails.Sum(d => d.Quantity) : 0,
                    TotalAmount = o.OrderDetails != null ? o.OrderDetails.Sum(d => d.Quantity * d.UnitPrice) : 0
                })
                .ToListAsync();

            // Lưu thông tin phân trang vào ViewBag
            ViewBag.CurrentPage = page;
            ViewBag.TotalPages = totalPages;
            ViewBag.TotalOrders = totalOrders;
            ViewBag.Search = search;
            ViewBag.StatusFilter = status;

            return View(orders);
        }

        /// <summary>
        /// DETAIL — Xem chi tiết đơn hàng
        /// GET: /Order/Detail/{id}
        /// </summary>
        [HttpGet("Order/Detail/{id}")]
        public async Task<IActionResult> Detail(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.User)
                .Include(o => o.OrderDetails!)
                    .ThenInclude(od => od.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                TempData["Error"] = "Không tìm thấy đơn hàng!";
                return RedirectToAction("Index");
            }

            return View(order);
        }

        /// <summary>
        /// UPDATE STATUS — Cập nhật trạng thái đơn hàng
        /// POST: /Order/UpdateStatus
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> UpdateStatus(int id, int newStatus)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                TempData["Error"] = "Không tìm thấy đơn hàng!";
                return RedirectToAction("Index");
            }

            if (newStatus < 0 || newStatus > 3)
            {
                TempData["Error"] = "Trạng thái không hợp lệ!";
                return RedirectToAction("Detail", new { id });
            }

            order.Status = newStatus;
            await _context.SaveChangesAsync();

            TempData["Success"] = $"Đã cập nhật trạng thái đơn hàng #{id} thành công!";
            return RedirectToAction("Detail", new { id });
        }

        /// <summary>
        /// DELETE — Xóa đơn hàng (Admin)
        /// POST: /Order/Delete/{id}
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                TempData["Error"] = "Không tìm thấy đơn hàng!";
                return RedirectToAction("Index");
            }

            // Xóa OrderDetail trước
            if (order.OrderDetails != null && order.OrderDetails.Any())
            {
                _context.OrderDetails.RemoveRange(order.OrderDetails);
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            TempData["Success"] = $"Đã xóa đơn hàng #{id} thành công!";
            return RedirectToAction("Index");
        }
    }

    /// <summary>
    /// ViewModel hiển thị danh sách đơn hàng (gọn nhẹ)
    /// </summary>
    public class OrderListVM
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public int Status { get; set; }
        public string? Notes { get; set; }
        public string CustomerName { get; set; } = "";
        public string CustomerEmail { get; set; } = "";
        public string? CustomerPhone { get; set; }
        public int TotalItems { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
