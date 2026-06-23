using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using duybao.data;
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    /// <summary>
    /// API Controller cho Danh mục bài viết (Blog Categories)
    /// Đường dẫn: /api/categories
    /// Auth: GET public, POST/PUT/DELETE cần Admin
    /// </summary>
    [Route("api/categories")]
    [ApiController]
    public class BlogCategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BlogCategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy toàn bộ danh mục bài viết
        /// GET: /api/categories
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _context.Categories
                .OrderBy(c => c.Id)
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.Description
                })
                .ToListAsync();

            return Ok(categories);
        }

        /// <summary>
        /// Lấy chi tiết một danh mục bài viết theo ID
        /// GET: /api/categories/{id}
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var category = await _context.Categories
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.Description
                })
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return NotFound(new { message = "Không tìm thấy danh mục bài viết" });

            return Ok(category);
        }

        /// <summary>
        /// Tạo danh mục bài viết mới (yêu cầu Admin)
        /// POST: /api/categories
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] Category model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrWhiteSpace(model.Name))
                return BadRequest(new { message = "Tên danh mục bài viết không được để trống" });

            _context.Categories.Add(model);
            await _context.SaveChangesAsync();

            return StatusCode(201, new { model.Id, model.Name, model.Description });
        }

        /// <summary>
        /// Cập nhật danh mục bài viết (yêu cầu Admin)
        /// PUT: /api/categories/{id}
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] Category model)
        {
            if (id != model.Id)
                return BadRequest(new { message = "ID danh mục không khớp" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = await _context.Categories.FindAsync(id);
            if (existing == null)
                return NotFound(new { message = "Không tìm thấy danh mục bài viết" });

            existing.Name = model.Name;
            existing.Description = model.Description;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Xóa danh mục bài viết (yêu cầu Admin)
        /// DELETE: /api/categories/{id}
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound(new { message = "Không tìm thấy danh mục bài viết" });

            // Kiểm tra xem danh mục có bài viết nào không trước khi xóa
            var hasPosts = await _context.Posts.AnyAsync(p => p.CategoryId == id);
            if (hasPosts)
                return BadRequest(new { message = "Không thể xóa danh mục đang có bài viết. Vui lòng xóa bài viết trước." });

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
