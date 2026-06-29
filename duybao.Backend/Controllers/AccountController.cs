using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using duybao.data;

namespace duybao.Backend.Controllers
{
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Login()
        {
            // Nếu đã đăng nhập → trả về JSON (API) hoặc redirect (Browser)
            if (User.Identity?.IsAuthenticated == true)
            {
                if (Request.Headers["Accept"].ToString().Contains("application/json"))
                {
                    return Json(new { isAuthenticated = true, username = User.Identity.Name });
                }
                return RedirectToAction("Index", "Home");
            }

            // Chưa đăng nhập → trả về JSON (API) hoặc View (Browser)
            if (Request.Headers["Accept"].ToString().Contains("application/json"))
            {
                return Json(new { isAuthenticated = false });
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string username, string password)
        {
            // 1. Kiểm tra tài khoản trong Database
            var user = _context.Users.FirstOrDefault(u => u.Username == username && u.PasswordHash == password);

            if (user != null)
            {
                // 2. Thiết lập danh tính (Claims)
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role), // Lưu vai trò: Admin/Editor
                    new Claim("FullName", user.FullName)
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                // 3. Đăng nhập và lưu Cookie PERSISTENT vào trình duyệt (sống 30 ngày)
                var authProperties = new AuthenticationProperties
                {
                    IsPersistent = true,                       // Cookie sống qua các lần đóng trình duyệt
                    ExpiresUtc = DateTimeOffset.UtcNow.AddDays(30)
                };
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, 
                    new ClaimsPrincipal(claimsIdentity), authProperties);

                // Nếu là API call (React), trả về JSON thay vì redirect
                if (Request.Headers["Accept"].ToString().Contains("application/json"))
                {
                    return Json(new { success = true, message = "Đăng nhập thành công!" });
                }

                // Đảm bảo Customer tồn tại (cho user cũ chưa có Customer)
                EnsureCustomerExists(user);

                return RedirectToAction("Index", "Category");
            }

            // Nếu là API call, trả về JSON error
            if (Request.Headers["Accept"].ToString().Contains("application/json"))
            {
                return Json(new { success = false, error = "Tên đăng nhập hoặc mật khẩu không đúng!" });
            }

            ViewBag.Error = "Tên đăng nhập hoặc mật khẩu không đúng!";
            return View();
        }

        // Hàm đăng xuất – xóa toàn bộ cookie/token
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            // Nếu là API call (React), trả về JSON thay vì redirect
            if (Request.Headers["Accept"].ToString().Contains("application/json"))
            {
                return Json(new { success = true, message = "Đã đăng xuất!" });
            }

            return RedirectToAction("Login");
        }
        // ──────────────────────────────
        // REGISTER — Đăng ký tài khoản mới (Public)
        // ──────────────────────────────

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(string username, string password, string fullName, string email)
        {
            // 1. Kiểm tra dữ liệu đầu vào
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                return Json(new { success = false, error = "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu." });
            }

            if (password.Length < 6)
            {
                return Json(new { success = false, error = "Mật khẩu phải có ít nhất 6 ký tự." });
            }

            // 2. Kiểm tra username đã tồn tại chưa
            var exists = _context.Users.Any(u => u.Username == username);
            if (exists)
            {
                return Json(new { success = false, error = "Tên đăng nhập đã được sử dụng. Vui lòng chọn tên khác." });
            }

            // 2.5 Kiểm tra email đã tồn tại trong Customer chưa
            var emailStr = string.IsNullOrWhiteSpace(email) ? username.Trim() : email.Trim();
            var emailExists = _context.Customers.Any(c => c.Email == emailStr);
            if (emailExists)
            {
                return Json(new { success = false, error = "Email này đã được sử dụng. Vui lòng chọn email khác." });
            }

            // 3. Tạo user mới (mặc định role = User)
            var newUser = new duybao.data.Entities.User
            {
                Username = username.Trim(),
                PasswordHash = password, // Trong production nên hash password (BCrypt)
                FullName = string.IsNullOrWhiteSpace(fullName) ? username.Trim() : fullName.Trim(),
                Role = "User"
            };

            // 3.5 Tạo Customer liên kết qua navigation (EF tự gán UserId)
            var customer = new duybao.data.Entities.Customer
            {
                User = newUser, // Navigation property
                FullName = newUser.FullName,
                Email = emailStr,
                Password = password
            };

            _context.Users.Add(newUser);
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync(); // 1 lần save atomic cho cả 2

            // 4. Tự động đăng nhập sau khi đăng ký
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, newUser.Username),
                new Claim(ClaimTypes.Role, newUser.Role),
                new Claim("FullName", newUser.FullName)
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddDays(30)
            };
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity), authProperties);

            return Json(new { success = true, message = "Đăng ký thành công!" });
        }

        /// <summary>
        /// Đảm bảo Customer tồn tại cho User (gọi khi login - fix cho user cũ)
        /// </summary>
        private void EnsureCustomerExists(duybao.data.Entities.User user)
        {
            var exists = _context.Customers.Any(c => c.UserId == user.Id);
            if (!exists)
            {
                _context.Customers.Add(new duybao.data.Entities.Customer
                {
                    UserId = user.Id,
                    FullName = user.FullName,
                    Email = user.Username, // tạm dùng username làm email
                    Password = user.PasswordHash
                });
                _context.SaveChanges();
            }
        }

        // Trang thông báo khi người dùng không có quyền truy cập (403)
        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }

        // ──────────────────────────────
        // PROFILE — Lấy & cập nhật thông tin cá nhân từ Customer
        // ──────────────────────────────

        [HttpGet("/api/account/profile")]
        public IActionResult GetProfile()
        {
            if (User.Identity?.IsAuthenticated != true)
                return Unauthorized(new { error = "Vui lòng đăng nhập." });

            var username = User.Identity.Name;
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
                return NotFound(new { error = "Không tìm thấy người dùng." });

            // Lấy Customer liên kết qua UserId
            var customer = _context.Customers.FirstOrDefault(c => c.UserId == user.Id);

            return Json(new
            {
                username = user.Username,
                fullName = customer?.FullName ?? user.FullName,
                role = user.Role,
                email = customer?.Email ?? "",
                phone = customer?.Phone ?? "",
                address = customer?.Address ?? ""
            });
        }

        [HttpPut("/api/account/profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] ProfileUpdateModel model)
        {
            if (User.Identity?.IsAuthenticated != true)
                return Unauthorized(new { error = "Vui lòng đăng nhập." });

            var username = User.Identity.Name;
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
                return NotFound(new { error = "Không tìm thấy người dùng." });

            // Cập nhật FullName trên User (hiển thị)
            if (!string.IsNullOrWhiteSpace(model.FullName))
                user.FullName = model.FullName.Trim();

            // Lấy hoặc tạo Customer liên kết
            var customer = _context.Customers.FirstOrDefault(c => c.UserId == user.Id);
            if (customer == null)
            {
                customer = new duybao.data.Entities.Customer
                {
                    UserId = user.Id,
                    FullName = user.FullName,
                    Email = !string.IsNullOrWhiteSpace(model.Email) ? model.Email.Trim() : user.Username,
                    Password = user.PasswordHash
                };
                _context.Customers.Add(customer);
            }

            // Cập nhật thông tin Customer
            if (!string.IsNullOrWhiteSpace(model.FullName))
                customer.FullName = model.FullName.Trim();
            if (!string.IsNullOrWhiteSpace(model.Email))
                customer.Email = model.Email.Trim();
            if (model.Phone != null)
                customer.Phone = model.Phone.Trim();
            if (model.Address != null)
                customer.Address = model.Address.Trim();

            await _context.SaveChangesAsync();

            // Cập nhật claim FullName trong cookie
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("FullName", user.FullName)
            };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                new AuthenticationProperties { IsPersistent = true, ExpiresUtc = DateTimeOffset.UtcNow.AddDays(30) });

            return Json(new
            {
                success = true,
                message = "Cập nhật thông tin thành công!",
                data = new
                {
                    username = user.Username,
                    fullName = customer.FullName,
                    role = user.Role,
                    email = customer.Email ?? "",
                    phone = customer.Phone ?? "",
                    address = customer.Address ?? ""
                }
            });
        }
    }

    // Model cho cập nhật profile
    public class ProfileUpdateModel
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
    }
}
