using Microsoft.AspNetCore.Mvc;
using duybao.data.Entities; // K?t n?i t?i l?p d? li?u b?n v?a t?o

namespace duybao.Backend.Controllers
{
    public class CategoryController : Controller
    {
        public IActionResult Index()
        {
            // T?o danh sách d? li?u m?u tr?c ti?p trong code
            var list = new List<Category>
            {
                new Category { Id = 1, Name = "Tin Công Ngh?", Description = "Review Laptop, AI" },
                new Category { Id = 2, Name = "Giáo D?c", Description = "Thông tin tuy?n sinh" }
            };
            return View(list); // G?i danh sách này sang giao di?n
        }
    }
}