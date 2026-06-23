using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using duybao.data;
using duybao.data.Entities;

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
        public async Task<IActionResult> GetAll([FromQuery] int? categoryId)
        {
            IQueryable<Post> query = _context.Posts
                .Include(p => p.Category);

            // Lọc theo danh mục bài viết nếu có truyền query param
            if (categoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

            var posts = await query
                .OrderByDescending(p => p.CreatedDate)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Content,
                    p.ImageUrl,
                    p.CreatedDate,
                    p.CategoryId,
                    Category = new { p.Category.Id, p.Category.Name }
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
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound(new { message = "Không tìm thấy bài viết này trong hệ thống" });
            }

            return Ok(new
            {
                post.Id,
                post.Title,
                post.Content,
                post.ImageUrl,
                post.CreatedDate,
                post.CategoryId,
                Category = post.Category != null ? new { post.Category.Id, post.Category.Name } : null
            });
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Tạo bài viết mới (yêu cầu đăng nhập Admin/Editor)
        //  POST: /api/posts
        // ──────────────────────────────────────────────────────────────
        [HttpPost]
        [Authorize(Roles = "Admin,Editor")]
        public async Task<IActionResult> Create([FromBody] Post post)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrWhiteSpace(post.Title))
                return BadRequest(new { message = "Tiêu đề bài viết không được để trống" });

            if (string.IsNullOrWhiteSpace(post.Content))
                return BadRequest(new { message = "Nội dung bài viết không được để trống" });

            // Tự động gán ngày tạo nếu chưa có
            if (post.CreatedDate == default)
                post.CreatedDate = DateTime.Now;

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return StatusCode(201, new
            {
                post.Id,
                post.Title,
                post.CreatedDate,
                post.CategoryId
            });
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Cập nhật bài viết (yêu cầu đăng nhập Admin/Editor)
        //  PUT:  /api/posts/{id}
        // ──────────────────────────────────────────────────────────────
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Editor")]
        public async Task<IActionResult> Update(int id, [FromBody] Post post)
        {
            if (id != post.Id)
                return BadRequest(new { message = "ID bài viết không khớp" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = await _context.Posts.FindAsync(id);
            if (existing == null)
                return NotFound(new { message = "Không tìm thấy bài viết" });

            // Cập nhật các trường
            existing.Title = post.Title;
            existing.Content = post.Content;
            existing.ImageUrl = post.ImageUrl;
            existing.CategoryId = post.CategoryId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Xóa bài viết (yêu cầu đăng nhập Admin/Editor)
        //  DELETE: /api/posts/{id}
        // ──────────────────────────────────────────────────────────────
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Editor")]
        public async Task<IActionResult> Delete(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
                return NotFound(new { message = "Không tìm thấy bài viết" });

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
