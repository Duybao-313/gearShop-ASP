using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using duybao.data;
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    [Authorize]
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Ti�m" k?t n?i v�o Controller
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

        // 1. H�m GET: D�ng ?? hi?n th? giao di?n Form cho nh?p
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // 2. H�m POST: D�ng ?? ?�n d? li?u t? Form g?i l�n v� l?u v�o SQL
        [HttpPost]
        public IActionResult Create(Category model)
        {
            // B??C 1: Th�m d? li?u v�o b? nh? t?m c?a Entity Framework
            _context.Categories.Add(model);
            // B??C 2: Ra l?nh cho h? th?ng ghi d? li?u th?t s? v�o SQL Server
            _context.SaveChanges();
            // Sau khi l?u th�nh c�ng, t? ??ng quay v? trang danh s�ch
            return RedirectToAction("Index");
        }

        // Action nh?n v�o Id c?a danh m?c c?n x�a
        public IActionResult Delete(int id)
        {
            // B??c 1: T�m ??i t??ng danh m?c trong Database b?ng Id
            var category = _context.Categories.Find(id);

            // Ki?m tra n?u t�m th?y th� m?i x�a
            if (category != null)
            {
                // B??c 2: L?nh x�a kh?i b? nh? t?m (Tracking)
                _context.Categories.Remove(category);

                // B??c 3: Ch?t phi�n l�m vi?c, x�a th?c s? trong SQL Server
                _context.SaveChanges();
            }

            // Sau khi x�a xong, quay l?i trang danh s�ch ?? c?p nh?t giao di?n
            return RedirectToAction("Index");
        }

        // 1. H�m GET: T�m d? li?u c? v� ?? l�n Form
        [HttpGet]
        public IActionResult Edit(int id)
        {
            // T�m danh m?c trong Database theo Id
            var category = _context.Categories.Find(id);

            if (category == null) return NotFound();

            return View(category); // G?i ??i t??ng t�m ???c sang giao di?n Edit
        }

        // 2. H�m POST: Nh?n d? li?u m?i t? ng??i d�ng v� l?u l?i
        [HttpPost]
        public IActionResult Edit(Category model)
        {
            // L?nh c?p nh?t ??i t??ng v�o b? nh? t?m
            _context.Categories.Update(model);

            // L?u thay ??i th?c s? xu?ng SQL Server 
            _context.SaveChanges();

            // Quay l?i trang danh s�ch ?? xem k?t qu?
            return RedirectToAction("Index");
        }
        // NOTE: API /api/categories đã được chuyển sang BlogCategoriesController
        // để tránh AmbiguousMatchException (trùng route với API Controller)
    }
}