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
        public async Task<IActionResult> Register(string username, string password, string fullName)
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

            // 3. Tạo user mới (mặc định role = User)
            var newUser = new duybao.data.Entities.User
            {
                Username = username.Trim(),
                PasswordHash = password, // Trong production nên hash password (BCrypt)
                FullName = string.IsNullOrWhiteSpace(fullName) ? username.Trim() : fullName.Trim(),
                Role = "User"
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

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
        // Trang th�ng b�o khi ng??i d�ng kh�ng c� quy?n truy c?p (403)
        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }
    }
}
