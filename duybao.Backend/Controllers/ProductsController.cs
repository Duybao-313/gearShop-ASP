using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using duybao.data;

namespace duybao.Backend.Controllers
{
    // 1. Định nghĩa đường dẫn để gọi API. [controller] sẽ tự lấy tên là "Products"
    // Khi chạy, địa chỉ truy cập dữ liệu sẽ là: https://localhost:xxxx/api/products
    [Route("api/[controller]")]
    // 2. Đánh dấu đây là một API Controller để hệ thống hỗ trợ các tính năng tự động kiểm tra dữ liệu đầu vào
    [ApiController]
    // 3. API Controller phải kế thừa từ ControllerBase (thay vì kế thừa từ Controller như phân hệ MVC)
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // 4. Hàm khởi tạo (Constructor): "Tiêm" ngữ cảnh dữ liệu SQL Server vào để sử dụng
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Lấy toàn bộ sản phẩm (sắp xếp sản phẩm mới nhất lên đầu)
        //  GET:  /api/products
        // ──────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.Products
                .OrderByDescending(p => p.Id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.StockQuantity
                })
                .ToListAsync();

            return Ok(products);
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Lấy sản phẩm theo danh mục sản phẩm
        //  GET:  /api/products/categoryproduct/{categoryProductId}
        // ──────────────────────────────────────────────────────────────
        [HttpGet("categoryproduct/{categoryProductId}")]
        public async Task<IActionResult> GetByCategoryProduct(int categoryProductId)
        {
            var products = await _context.Products
                .Where(p => p.CategoryProductId == categoryProductId)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.StockQuantity
                })
                .ToListAsync();

            return Ok(products);
        }

        // ──────────────────────────────────────────────────────────────
        //  API: Lấy chi tiết sản phẩm theo ID
        //  GET:  /api/products/{id}
        // ──────────────────────────────────────────────────────────────
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm này trong hệ thống" });
            }

            return Ok(product);
        }
    }
}
