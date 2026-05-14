using Microsoft.AspNetCore.Mvc;
using duybao.data; // Thêm gọi database context
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối vào Controller
        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Hàm Index: Hiển thị danh sách bài viết từ Database
        public IActionResult Index()
        {
            var posts = _context.Posts.ToList();
            return View(posts);
        }

        // Hàm Details: Hiển thị chi tiết một bài viết từ Database
        public IActionResult Details(int id)
        {
            var post = _context.Posts.Find(id);

            if (post == null) return NotFound();

            return View(post);
        }
    }
}
