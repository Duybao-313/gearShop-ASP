using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using duybao.data;
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    [Authorize(Roles = "Admin")]
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ──────────────────────────────
        // INDEX — Danh sách khách hàng
        // ──────────────────────────────
        public async Task<IActionResult> Index()
        {
            var customers = await _context.Customers
                .Include(c => c.User)
                .OrderByDescending(c => c.Id)
                .ToListAsync();
            return View(customers);
        }

        // ──────────────────────────────
        // CREATE — Thêm khách hàng mới
        // ──────────────────────────────

        [HttpGet]
        public IActionResult Create()
        {
            // Load danh sách User để chọn liên kết
            ViewBag.Users = _context.Users
                .OrderBy(u => u.Username)
                .ToList();
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Customer model)
        {
            // Kiểm tra email đã tồn tại chưa
            var emailExists = await _context.Customers
                .AnyAsync(c => c.Email == model.Email);
            if (emailExists)
            {
                ModelState.AddModelError("Email", "Email này đã được sử dụng!");
                ViewBag.Users = _context.Users.OrderBy(u => u.Username).ToList();
                return View(model);
            }

            // Nếu không chọn User, tạo User mới tự động
            if (model.UserId == null || model.UserId == 0)
            {
                var newUser = new User
                {
                    Username = model.Email.Split('@')[0],
                    PasswordHash = PasswordHasher.Hash("123456"), // mk mặc định
                    FullName = model.FullName,
                    Role = "User"
                };
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();
                model.UserId = newUser.Id;
            }

            // Đồng bộ Password với User nếu có liên kết
            var linkedUser = model.UserId.HasValue ? await _context.Users.FindAsync(model.UserId.Value) : null;
            if (linkedUser != null)
            {
                model.Password = linkedUser.PasswordHash;
            }
            else
            {
                model.Password = PasswordHasher.Hash("123456");
            }

            _context.Customers.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        // ──────────────────────────────
        // EDIT — Sửa thông tin khách hàng
        // ──────────────────────────────

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var customer = await _context.Customers
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null) return NotFound();

            ViewBag.Users = _context.Users.OrderBy(u => u.Username).ToList();
            return View(customer);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(Customer model, string? NewPassword)
        {
            var existingCustomer = await _context.Customers
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == model.Id);

            if (existingCustomer == null) return NotFound();

            // Kiểm tra email trùng (trừ chính nó)
            var emailExists = await _context.Customers
                .AnyAsync(c => c.Email == model.Email && c.Id != model.Id);
            if (emailExists)
            {
                ModelState.AddModelError("Email", "Email này đã được sử dụng!");
                ViewBag.Users = _context.Users.OrderBy(u => u.Username).ToList();
                return View(model);
            }

            // Xử lý đổi mật khẩu (nếu nhập mới)
            if (!string.IsNullOrWhiteSpace(NewPassword))
            {
                model.Password = PasswordHasher.Hash(NewPassword);

                // Đồng bộ mật khẩu sang User nếu có liên kết
                if (model.UserId.HasValue && model.UserId > 0)
                {
                    var linkedUser = await _context.Users.FindAsync(model.UserId.Value);
                    if (linkedUser != null)
                    {
                        linkedUser.PasswordHash = model.Password;
                        _context.Users.Update(linkedUser);
                    }
                }
            }
            else
            {
                model.Password = existingCustomer.Password;
            }

            // Đồng bộ FullName sang User nếu có liên kết
            if (model.UserId.HasValue && model.UserId > 0)
            {
                var linkedUser = await _context.Users.FindAsync(model.UserId.Value);
                if (linkedUser != null && linkedUser.FullName != model.FullName)
                {
                    linkedUser.FullName = model.FullName;
                    _context.Users.Update(linkedUser);
                }
            }

            _context.Customers.Update(model);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        // ──────────────────────────────
        // DELETE — Xóa khách hàng
        // ──────────────────────────────

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var customer = await _context.Customers
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (customer != null)
            {
                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction("Index");
        }
    }
}
