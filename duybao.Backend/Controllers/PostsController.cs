using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using duybao.data;

namespace duybao.Backend.Controllers
{
    // 1. Định nghĩa đường dẫn để gọi API. [controller] sẽ tự lấy tên là "Posts"
    // Khi chạy, địa chỉ truy cập dữ liệu sẽ là: https://localhost:xxxx/api/posts
    [Route("api/[controller]")]
    // 2. Đánh dấu đây là một API Controller để hệ thống hỗ trợ các tính năng tự động kiểm tra dữ liệu đầu vào
    [ApiController]
    // 3. API Controller phải kế thừa từ ControllerBase (thay vì kế thừa từ Controller như phân hệ MVC)
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // 4. Hàm khởi tạo (Constructor): "Tiêm" ngữ cảnh dữ liệu SQL Server vào để sử dụng
        public PostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Lấy toàn bộ bài viết (sắp xếp bài mới nhất lên đầu)
        //  GET:  /api/posts
        // ──────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var posts = await _context.Posts
                .OrderByDescending(p => p.Id)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.ImageUrl,
                    p.CreatedDate,
                    CategoryName = p.Category.Name
                })
                .ToListAsync();

            return Ok(posts);
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Lấy bài viết theo chuyên mục
        //  GET:  /api/posts/category/{categoryId}
        // ──────────────────────────────────────────────────────────────
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetByCategory(int categoryId)
        {
            var posts = await _context.Posts
                .Where(p => p.CategoryId == categoryId)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.ImageUrl,
                    p.CreatedDate
                })
                .ToListAsync();

            return Ok(posts);
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Lấy chi tiết bài viết theo ID
        //  GET:  /api/posts/{id}
        // ──────────────────────────────────────────────────────────────
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var post = await _context.Posts
                .FirstOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound(new { message = "Không tìm thấy bài viết này trong hệ thống" });
            }

            return Ok(post);
        }
    }
}
