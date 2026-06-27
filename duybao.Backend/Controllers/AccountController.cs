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

                // 3. Đăng nhập và lưu Cookie vào trình duyệt
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, 
                    new ClaimsPrincipal(claimsIdentity));

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

        // H�m ??ng xu?t
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
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
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity));

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
