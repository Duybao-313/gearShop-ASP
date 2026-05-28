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

        // 1. Hàm GET: Dùng ?? hi?n th? giao di?n Form cho nh?p
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // 2. Hàm POST: Dùng ?? ?ón d? li?u t? Form g?i lên và l?u vào SQL
        [HttpPost]
        public IActionResult Create(Category model)
        {
            // B??C 1: Thêm d? li?u vào b? nh? t?m c?a Entity Framework
            _context.Categories.Add(model);
            // B??C 2: Ra l?nh cho h? th?ng ghi d? li?u th?t s? vào SQL Server
            _context.SaveChanges();
            // Sau khi l?u thành công, t? ??ng quay v? trang danh sách
            return RedirectToAction("Index");
        }

        // Action nh?n vào Id c?a danh m?c c?n xóa
        public IActionResult Delete(int id)
        {
            // B??c 1: Tìm ??i t??ng danh m?c trong Database b?ng Id
            var category = _context.Categories.Find(id);

            // Ki?m tra n?u tìm th?y thì m?i xóa
            if (category != null)
            {
                // B??c 2: L?nh xóa kh?i b? nh? t?m (Tracking)
                _context.Categories.Remove(category);

                // B??c 3: Ch?t phiên làm vi?c, xóa th?c s? trong SQL Server
                _context.SaveChanges();
            }

            // Sau khi xóa xong, quay l?i trang danh sách ?? c?p nh?t giao di?n
            return RedirectToAction("Index");
        }

        // 1. Hàm GET: Tìm d? li?u c? và ?? lên Form
        [HttpGet]
        public IActionResult Edit(int id)
        {
            // Tìm danh m?c trong Database theo Id
            var category = _context.Categories.Find(id);

            if (category == null) return NotFound();

            return View(category); // G?i ??i t??ng tìm ???c sang giao di?n Edit
        }

        // 2. Hàm POST: Nh?n d? li?u m?i t? ng??i dùng và l?u l?i
        [HttpPost]
        public IActionResult Edit(Category model)
        {
            // L?nh c?p nh?t ??i t??ng vào b? nh? t?m
            _context.Categories.Update(model);

            // L?u thay ??i th?c s? xu?ng SQL Server 
            _context.SaveChanges();

            // Quay l?i trang danh sách ?? xem k?t qu?
            return RedirectToAction("Index");
        }
    }
}