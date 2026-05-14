using Microsoft.AspNetCore.Mvc;
using duybao.data; // Thêm g?i database context
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" k?t n?i vào Controller
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Hàm Index: Hi?n th? danh sách thành viên qu?n tr? t? Database
        public IActionResult Index()
        {
            var users = _context.Users.ToList();
            return View(users);
        }
    }
}
