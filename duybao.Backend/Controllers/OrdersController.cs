using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text.Json;
using duybao.data;
using duybao.data.Entities;
using duybao.Backend.Services;

namespace duybao.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IServiceScopeFactory _scopeFactory;

        public OrdersController(ApplicationDbContext context, IEmailService emailService, IServiceScopeFactory scopeFactory)
        {
            _context = context;
            _emailService = emailService;
            _scopeFactory = scopeFactory;
        }

        /// <summary>
        /// Lấy user ID hiện tại từ cookie (nếu đã login), ngược lại trả về 0
        /// </summary>
        private int GetUserId()
        {
            var username = User.FindFirstValue(ClaimTypes.Name);
            if (string.IsNullOrEmpty(username)) return 0;
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            return user?.Id ?? 0;
        }

        /// <summary>
        /// API: Lấy đơn hàng của người dùng hiện tại (yêu cầu đăng nhập)
        /// GET: /api/Orders/my
        /// </summary>
        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> GetMyOrders()
        {
            var userId = GetUserId();
            if (userId == 0)
                return Unauthorized(new { message = "Vui lòng đăng nhập để xem đơn hàng" });

            var orders = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails!)
                    .ThenInclude(od => od.Product)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new
                {
                    o.Id,
                    o.OrderDate,
                    o.Status,
                    o.Notes,
                    o.CustomerId,
                    Customer = o.Customer != null ? new { o.Customer.Id, o.Customer.FullName, o.Customer.Email, o.Customer.Phone } : null,
                    TotalItems = o.OrderDetails != null ? o.OrderDetails.Sum(d => d.Quantity) : 0,
                    TotalAmount = o.OrderDetails != null ? o.OrderDetails.Sum(d => d.Quantity * d.UnitPrice) : 0,
                    OrderDetails = o.OrderDetails != null ? o.OrderDetails.Select(od => new
                    {
                        od.Id,
                        od.ProductId,
                        od.Quantity,
                        od.UnitPrice,
                        Product = od.Product != null ? new { od.Product.Id, od.Product.Name, od.Product.ImageUrl, od.Product.Price } : null
                    }) : null
                })
                .ToListAsync();

            return Ok(orders);
        }

        /// <summary>
        /// API: Lấy chi tiết đơn hàng của người dùng hiện tại (yêu cầu đăng nhập)
        /// GET: /api/Orders/my/{id}
        /// </summary>
        [HttpGet("my/{id}")]
        [Authorize]
        public async Task<IActionResult> GetMyDetail(int id)
        {
            var userId = GetUserId();
            if (userId == 0)
                return Unauthorized(new { message = "Vui lòng đăng nhập để xem chi tiết đơn hàng" });

            var order = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails!)
                    .ThenInclude(od => od.Product)
                .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

            if (order == null)
                return NotFound(new { message = "Không tìm thấy đơn hàng hoặc bạn không có quyền xem" });

            return Ok(new
            {
                order.Id,
                order.OrderDate,
                order.Status,
                order.Notes,
                order.CustomerId,
                Customer = order.Customer != null ? new { order.Customer.Id, order.Customer.FullName, order.Customer.Email, order.Customer.Phone, order.Customer.Address } : null,
                OrderDetails = order.OrderDetails != null ? order.OrderDetails.Select(od => new
                {
                    od.Id,
                    od.ProductId,
                    od.Quantity,
                    od.UnitPrice,
                    Product = od.Product != null ? new { od.Product.Id, od.Product.Name, od.Product.ImageUrl, od.Product.Price, od.Product.Description, od.Product.Brand } : null
                }) : null
            });
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
                .Include(o => o.OrderDetails!)
                    .ThenInclude(od => od.Product)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new
                {
                    o.Id,
                    o.OrderDate,
                    o.Status,
                    o.Notes,
                    o.CustomerId,
                    Customer = o.Customer != null ? new { o.Customer.Id, o.Customer.FullName, o.Customer.Email, o.Customer.Phone } : null,
                    TotalItems = o.OrderDetails != null ? o.OrderDetails.Sum(d => d.Quantity) : 0,
                    TotalAmount = o.OrderDetails != null ? o.OrderDetails.Sum(d => d.Quantity * d.UnitPrice) : 0
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
        /// Body: { customerId, notes, items: [{ productId, quantity, price }] }
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderInputDTO input)
        {
            if (input == null)
            {
                return BadRequest(new { message = "Dữ liệu đơn hàng không hợp lệ" });
            }

            if (input.Items == null || input.Items.Count == 0)
            {
                return BadRequest(new { message = "Đơn hàng phải có ít nhất một sản phẩm" });
            }

            try
            {
                // ── Xác định hoặc tạo Customer ──────────────────────────────
                var customerId = 0;
                Customer? customer = null;
                var userId = GetUserId(); // Lấy UserId nếu đã đăng nhập

                // Parse thông tin khách hàng từ notes JSON
                string? customerName = null, customerEmail = null, customerPhone = null, customerAddress = null;
                if (!string.IsNullOrEmpty(input.Notes))
                {
                    try
                    {
                        var notesJson = JsonDocument.Parse(input.Notes);
                        var root = notesJson.RootElement;
                        customerName = root.TryGetProperty("customerName", out var cn) ? cn.GetString() : null;
                        customerEmail = root.TryGetProperty("customerEmail", out var ce) ? ce.GetString() : null;
                        customerPhone = root.TryGetProperty("customerPhone", out var cp) ? cp.GetString() : null;
                        customerAddress = root.TryGetProperty("customerAddress", out var ca) ? ca.GetString() : null;
                    }
                    catch { /* notes không phải JSON hợp lệ, bỏ qua */ }
                }

                // Nếu đã đăng nhập → lock email & họ tên theo tài khoản Customer
                if (userId > 0)
                {
                    customer = await _context.Customers
                        .FirstOrDefaultAsync(c => c.UserId == userId);

                    if (customer != null)
                    {
                        // Ghi đè email & họ tên từ tài khoản (lock theo customer)
                        customerEmail = customer.Email;
                        customerName = customer.FullName;
                        // Vẫn cho phép cập nhật SĐT & địa chỉ từ form
                        if (!string.IsNullOrEmpty(customerPhone)) customer.Phone = customerPhone;
                        if (!string.IsNullOrEmpty(customerAddress)) customer.Address = customerAddress;
                    }
                }

                // Tìm Customer theo email (nếu có)
                if (customer == null && !string.IsNullOrEmpty(customerEmail))
                {
                    customer = await _context.Customers
                        .FirstOrDefaultAsync(c => c.Email == customerEmail);
                }

                if (customer == null)
                {
                    // Tạo Customer mới
                    customer = new Customer
                    {
                        FullName = customerName ?? "Khách lẻ",
                        Email = customerEmail ?? $"guest_{DateTime.Now.Ticks}@temp.com",
                        Phone = customerPhone,
                        Address = customerAddress,
                        Password = "guest", // mật khẩu mặc định cho khách lẻ
                        UserId = userId > 0 ? userId : null // Gắn UserId nếu đã login
                    };
                    _context.Customers.Add(customer);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    // Cập nhật thông tin nếu có thay đổi (chỉ SĐT & địa chỉ)
                    if (!string.IsNullOrEmpty(customerPhone)) customer.Phone = customerPhone;
                    if (!string.IsNullOrEmpty(customerAddress)) customer.Address = customerAddress;
                    // Nếu chưa login → cho phép cập nhật tên (khách lẻ)
                    if (userId <= 0 && !string.IsNullOrEmpty(customerName))
                        customer.FullName = customerName;
                }

                customerId = customer.Id;

                // ── Tạo Order ────────────────────────────────────────────────
                var newOrder = new Order
                {
                    OrderDate = DateTime.Now,
                    CustomerId = customerId,
                    UserId = userId > 0 ? userId : null, // Gán UserId nếu đã login
                    Status = 0,
                    Notes = input.Notes
                };

                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync(); // Lưu trước để có Order.Id

                // Lưu từng dòng OrderDetail và trừ tồn kho
                foreach (var item in input.Items)
                {
                    var product = await _context.Products.FindAsync(item.ProductId);
                    if (product == null)
                    {
                        return BadRequest(new { message = $"Sản phẩm ID={item.ProductId} không tồn tại" });
                    }

                    if (product.StockQuantity < item.Quantity)
                    {
                        return BadRequest(new { message = $"Sản phẩm '{product.Name}' chỉ còn {product.StockQuantity} sản phẩm trong kho" });
                    }

                    // Trừ tồn kho
                    product.StockQuantity -= item.Quantity;

                    // Thêm OrderDetail
                    _context.OrderDetails.Add(new OrderDetail
                    {
                        OrderId = newOrder.Id,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        UnitPrice = item.Price
                    });
                }

                await _context.SaveChangesAsync();

                // ── Gửi email xác nhận đơn hàng (fire-and-forget, scope riêng) ──
                var orderId = newOrder.Id;
                var custEmail = customer.Email;
                var custFullName = customer.FullName;
                var totalAmount = input.TotalAmount;
                var itemDtos = input.Items.Select(i => new { i.ProductId, i.Quantity, i.Price }).ToList();

                _ = Task.Run(async () =>
                {
                    try
                    {
                        using var scope = _scopeFactory.CreateScope();
                        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                        var emailSvc = scope.ServiceProvider.GetRequiredService<IEmailService>();

                        // Lấy tên sản phẩm từ DB để đưa vào email
                        var productIds = itemDtos.Select(i => i.ProductId).ToList();
                        var products = await db.Products
                            .Where(p => productIds.Contains(p.Id))
                            .ToDictionaryAsync(p => p.Id, p => p.Name);

                        var emailItems = itemDtos
                            .Select(i => (
                                ProductName: products.TryGetValue(i.ProductId, out var name) ? name : $"Sản phẩm #{i.ProductId}",
                                Quantity: i.Quantity,
                                UnitPrice: i.Price
                            ))
                            .ToList();

                        // Dựng lại object Customer tối thiểu để truyền vào email service
                        var cust = new Customer { FullName = custFullName, Email = custEmail };
                        var ord = new Order { Id = orderId, OrderDate = DateTime.Now };

                        await emailSvc.SendOrderConfirmationAsync(cust, ord, emailItems, totalAmount);
                    }
                    catch (Exception emailEx)
                    {
                        Console.WriteLine($"[Email Error] Không gửi được email cho đơn hàng #{orderId}: {emailEx.Message}");
                    }
                });

                return StatusCode(201, new { 
                    message = "Đặt hàng thành công!", 
                    orderId = newOrder.Id 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi xử lý tạo đơn hàng", detail = ex.Message });
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

            if (input.Status < 0 || input.Status > 3)
                return BadRequest(new { message = "Trạng thái không hợp lệ. 0: Chờ duyệt, 1: Đang giao, 2: Đã xong, 3: Đã hủy" });

            order.Status = input.Status;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật trạng thái thành công", orderId = order.Id, status = order.Status });
        }

        /// <summary>
        /// API: Hủy đơn hàng (chỉ khi trạng thái = 0: Chờ duyệt)
        /// PUT: /api/Orders/{id}/cancel
        /// </summary>
        [HttpPut("{id}/cancel")]
        [Authorize]
        public async Task<IActionResult> CancelOrder(int id)
        {
            var userId = GetUserId();
            if (userId == 0)
                return Unauthorized(new { message = "Vui lòng đăng nhập để hủy đơn hàng" });

            var order = await _context.Orders
                .Include(o => o.OrderDetails!)
                    .ThenInclude(od => od.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound(new { message = "Không tìm thấy đơn hàng" });

            // Chỉ chủ đơn (hoặc Admin) mới được hủy
            bool isAdmin = User.IsInRole("Admin");
            if (order.UserId != userId && !isAdmin)
                return Forbid();

            // Chỉ hủy được khi đơn đang ở trạng thái "Chờ duyệt" (0)
            if (order.Status != 0)
            {
                var statusText = order.Status switch
                {
                    1 => "Đang giao",
                    2 => "Đã xong",
                    3 => "Đã hủy",
                    _ => "không xác định"
                };
                return BadRequest(new { message = $"Không thể hủy đơn hàng đang ở trạng thái \"{statusText}\". Chỉ hủy được đơn hàng đang chờ duyệt." });
            }

            // ── Hoàn lại tồn kho ──
            if (order.OrderDetails != null)
            {
                foreach (var detail in order.OrderDetails)
                {
                    if (detail.Product != null)
                    {
                        detail.Product.StockQuantity += detail.Quantity;
                    }
                }
            }

            // Cập nhật trạng thái thành "Đã hủy" (3)
            order.Status = 3;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã hủy đơn hàng thành công!", orderId = order.Id, status = order.Status });
        }
    }

    // ─── DTO: Nhận dữ liệu đơn hàng từ Frontend ───
    public class OrderInputDTO
    {
        public int CustomerId { get; set; }
        public string? Notes { get; set; }
        public decimal TotalAmount { get; set; }
        public List<OrderItemDTO> Items { get; set; } = new();
    }

    // ─── DTO: Từng dòng sản phẩm trong đơn hàng ───
    public class OrderItemDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }

    // DTO cập nhật trạng thái đơn hàng
    public class UpdateStatusDTO
    {
        public int Status { get; set; }
    }
}
