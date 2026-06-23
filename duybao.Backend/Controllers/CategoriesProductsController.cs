using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using duybao.data;
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    // 1. Cấu hình đường dẫn API: api/CategoriesProducts
    [Route("api/[controller]")]

    // 2. Kích hoạt tính năng tự động kiểm tra lỗi dữ liệu (Validation)
    [ApiController]

    // 3. Kế thừa ControllerBase để tối ưu bộ nhớ cho API thuần dữ liệu JSON
    public class CategoriesProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // 4. Hàm khởi tạo: Nạp cơ sở dữ liệu vào Controller thông qua DI
        public CategoriesProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// API lấy toàn bộ danh mục sản phẩm (Giao thức GET)
        /// Đường dẫn gọi dữ liệu: GET https://localhost:xxxx/api/CategoriesProducts
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var categories = await _context.CategoriesProducts
                    .OrderBy(c => c.Id)
                    .Select(c => new {
                        c.Id,
                        c.Name,
                        c.Description
                    })
                    .ToListAsync();

                return Ok(categories);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { 
                    message = "Lỗi kết nối cơ sở dữ liệu hệ thống", 
                    detail = ex.Message 
                });
            }
        }

        /// <summary>
        /// API lấy chi tiết một danh mục sản phẩm theo ID
        /// GET: /api/CategoriesProducts/{id}
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var category = await _context.CategoriesProducts
                .Select(c => new {
                    c.Id,
                    c.Name,
                    c.Description
                })
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return NotFound(new { message = "Không tìm thấy danh mục sản phẩm" });

            return Ok(category);
        }

        /// <summary>
        /// API tạo danh mục sản phẩm mới (yêu cầu Admin)
        /// POST: /api/CategoriesProducts
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CategoryProduct model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrWhiteSpace(model.Name))
                return BadRequest(new { message = "Tên danh mục sản phẩm không được để trống" });

            _context.CategoriesProducts.Add(model);
            await _context.SaveChangesAsync();

            return StatusCode(201, new { model.Id, model.Name, model.Description });
        }

        /// <summary>
        /// API cập nhật danh mục sản phẩm (yêu cầu Admin)
        /// PUT: /api/CategoriesProducts/{id}
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] CategoryProduct model)
        {
            if (id != model.Id)
                return BadRequest(new { message = "ID danh mục không khớp" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = await _context.CategoriesProducts.FindAsync(id);
            if (existing == null)
                return NotFound(new { message = "Không tìm thấy danh mục sản phẩm" });

            existing.Name = model.Name;
            existing.Description = model.Description;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// API xóa danh mục sản phẩm (yêu cầu Admin)
        /// DELETE: /api/CategoriesProducts/{id}
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _context.CategoriesProducts.FindAsync(id);
            if (category == null)
                return NotFound(new { message = "Không tìm thấy danh mục sản phẩm" });

            _context.CategoriesProducts.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
