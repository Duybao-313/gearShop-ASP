using Microsoft.AspNetCore.Mvc;
using duybao.data; // Thêm dòng này ?? g?i ApplicationDbContext
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" k?t n?i vào Controller
        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // L?y d? li?u TH?T t? b?ng Categories trong Database
            var data = _context.Categories.ToList(); 
            return View(data);
        }
    }
}