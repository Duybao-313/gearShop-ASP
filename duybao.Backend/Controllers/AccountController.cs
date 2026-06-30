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
            // 1. Tìm tài khoản trong Database theo username
            var user = _context.Users.FirstOrDefault(u => u.Username == username);

            if (user != null && PasswordHasher.Verify(password, user.PasswordHash, out string? upgradedHash))
            {
                // Nếu hash cũ (plain text) đã được upgrade, cập nhật lại vào DB
                if (upgradedHash != null)
                {
                    user.PasswordHash = upgradedHash;
                    // Đồng bộ sang Customer nếu có
                    var cust = _context.Customers.FirstOrDefault(c => c.UserId == user.Id);
                    if (cust != null)
                        cust.Password = upgradedHash;
                    await _context.SaveChangesAsync();
                }

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

            // 3. Hash mật khẩu trước khi lưu
            var hashedPassword = PasswordHasher.Hash(password);

            // 4. Tạo user mới (mặc định role = User)
            var newUser = new duybao.data.Entities.User
            {
                Username = username.Trim(),
                PasswordHash = hashedPassword,
                FullName = string.IsNullOrWhiteSpace(fullName) ? username.Trim() : fullName.Trim(),
                Role = "User"
            };

            // 4.5 Tạo Customer liên kết qua navigation (EF tự gán UserId)
            var customer = new duybao.data.Entities.Customer
            {
                User = newUser, // Navigation property
                FullName = newUser.FullName,
                Email = emailStr,
                Password = hashedPassword
            };

            _context.Users.Add(newUser);
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync(); // 1 lần save atomic cho cả 2

            // 5. Tự động đăng nhập sau khi đăng ký
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
                // Nếu PasswordHash chưa phải BCrypt, hash lại trước khi lưu vào Customer
                var customerPassword = PasswordHasher.IsBcryptHash(user.PasswordHash)
                    ? user.PasswordHash
                    : PasswordHasher.Hash(user.PasswordHash);

                _context.Customers.Add(new duybao.data.Entities.Customer
                {
                    UserId = user.Id,
                    FullName = user.FullName,
                    Email = user.Username, // tạm dùng username làm email
                    Password = customerPassword
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
                // Nếu PasswordHash chưa phải BCrypt, hash lại trước khi lưu vào Customer
                var customerPassword = PasswordHasher.IsBcryptHash(user.PasswordHash)
                    ? user.PasswordHash
                    : PasswordHasher.Hash(user.PasswordHash);

                customer = new duybao.data.Entities.Customer
                {
                    UserId = user.Id,
                    FullName = user.FullName,
                    Email = !string.IsNullOrWhiteSpace(model.Email) ? model.Email.Trim() : user.Username,
                    Password = customerPassword
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

        // ──────────────────────────────
        // FORGOT PASSWORD — Quên mật khẩu
        // ──────────────────────────────

        [HttpGet]
        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> ForgotPassword(string username)
        {
            // Nếu là API call (React), trả về JSON
            var isApi = Request.Headers["Accept"].ToString().Contains("application/json");

            if (string.IsNullOrWhiteSpace(username))
            {
                if (isApi) return Json(new { success = false, error = "Vui lòng nhập tên đăng nhập." });
                ViewBag.Error = "Vui lòng nhập tên đăng nhập.";
                return View();
            }

            var user = _context.Users.FirstOrDefault(u => u.Username == username.Trim());
            if (user == null)
            {
                // Không tiết lộ user có tồn tại hay không (bảo mật)
                if (isApi) return Json(new { success = true, message = "Nếu tài khoản tồn tại, link đặt lại mật khẩu đã được tạo." });
                ViewBag.Message = "Nếu tài khoản tồn tại, link đặt lại mật khẩu đã được tạo.";
                return View();
            }

            // Tạo token reset (GUID) + thời hạn 15 phút
            var token = Guid.NewGuid().ToString("N");
            user.ResetPasswordToken = token;
            user.ResetPasswordTokenExpiry = DateTime.UtcNow.AddMinutes(15);
            await _context.SaveChangesAsync();

            // Tạo link reset
            var resetLink = Url.Action("ResetPassword", "Account", new { token }, Request.Scheme);

            if (isApi)
            {
                return Json(new { success = true, message = "Link đặt lại mật khẩu đã được tạo.", resetLink });
            }

            ViewBag.ResetLink = resetLink;
            ViewBag.Message = "Link đặt lại mật khẩu đã được tạo (có hiệu lực trong 15 phút):";
            return View();
        }

        // ──────────────────────────────
        // RESET PASSWORD — Đặt lại mật khẩu
        // ──────────────────────────────

        [HttpGet]
        public IActionResult ResetPassword(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                ViewBag.Error = "Token không hợp lệ hoặc đã hết hạn.";
                return View();
            }

            var user = _context.Users.FirstOrDefault(u =>
                u.ResetPasswordToken == token &&
                u.ResetPasswordTokenExpiry > DateTime.UtcNow);

            if (user == null)
            {
                ViewBag.Error = "Token không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu lại.";
                return View();
            }

            // Token hợp lệ → hiển thị form đặt lại mật khẩu
            ViewBag.Token = token;
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> ResetPassword(string token, string newPassword, string confirmPassword)
        {
            var isApi = Request.Headers["Accept"].ToString().Contains("application/json");

            if (string.IsNullOrWhiteSpace(token))
            {
                if (isApi) return Json(new { success = false, error = "Token không hợp lệ." });
                ViewBag.Error = "Token không hợp lệ.";
                return View();
            }

            if (string.IsNullOrWhiteSpace(newPassword) || newPassword.Length < 6)
            {
                if (isApi) return Json(new { success = false, error = "Mật khẩu mới phải có ít nhất 6 ký tự." });
                ViewBag.Error = "Mật khẩu mới phải có ít nhất 6 ký tự.";
                ViewBag.Token = token;
                return View();
            }

            if (newPassword != confirmPassword)
            {
                if (isApi) return Json(new { success = false, error = "Mật khẩu xác nhận không khớp." });
                ViewBag.Error = "Mật khẩu xác nhận không khớp.";
                ViewBag.Token = token;
                return View();
            }

            var user = _context.Users.FirstOrDefault(u =>
                u.ResetPasswordToken == token &&
                u.ResetPasswordTokenExpiry > DateTime.UtcNow);

            if (user == null)
            {
                if (isApi) return Json(new { success = false, error = "Token không hợp lệ hoặc đã hết hạn." });
                ViewBag.Error = "Token không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu lại.";
                return View();
            }

            // Cập nhật mật khẩu mới
            user.PasswordHash = PasswordHasher.Hash(newPassword);

            // Xóa token sau khi dùng (bảo mật: mỗi token chỉ dùng 1 lần)
            user.ResetPasswordToken = null;
            user.ResetPasswordTokenExpiry = null;

            // Đồng bộ mật khẩu sang Customer nếu có
            var customer = _context.Customers.FirstOrDefault(c => c.UserId == user.Id);
            if (customer != null)
            {
                customer.Password = user.PasswordHash;
            }

            await _context.SaveChangesAsync();

            if (isApi)
            {
                return Json(new { success = true, message = "Đặt lại mật khẩu thành công! Vui lòng đăng nhập." });
            }

            ViewBag.Success = true;
            ViewBag.Message = "Đặt lại mật khẩu thành công!";
            return View();
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
