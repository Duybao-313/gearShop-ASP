using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using duybao.data;
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    [Authorize]
    public class ProductCategoryController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ProductCategoryController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public IActionResult Index()
        {
            var data = _context.CategoriesProducts.ToList();
            return View(data);
        }

        // ──────────────────────────────
        // 1. CREATE - Thêm danh mục sản phẩm mới
        // ──────────────────────────────

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CategoryProduct model, IFormFile? imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "categories");
                Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + imageFile.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                model.ImageUrl = "/uploads/categories/" + uniqueFileName;
            }

            _context.CategoriesProducts.Add(model);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        // ──────────────────────────────
        // 2. EDIT - Sửa danh mục sản phẩm
        // ──────────────────────────────

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var category = _context.CategoriesProducts.Find(id);
            if (category == null) return NotFound();
            return View(category);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(CategoryProduct model, IFormFile? imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "categories");
                Directory.CreateDirectory(uploadsFolder);

                // Xóa ảnh cũ nếu có
                var existingCategory = _context.CategoriesProducts.AsNoTracking().FirstOrDefault(c => c.Id == model.Id);
                if (existingCategory != null && !string.IsNullOrEmpty(existingCategory.ImageUrl))
                {
                    var oldFilePath = Path.Combine(_env.WebRootPath, existingCategory.ImageUrl.TrimStart('/'));
                    if (System.IO.File.Exists(oldFilePath))
                    {
                        System.IO.File.Delete(oldFilePath);
                    }
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + imageFile.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                model.ImageUrl = "/uploads/categories/" + uniqueFileName;
            }
            else
            {
                // Giữ lại ảnh cũ nếu không upload ảnh mới
                var existingCategory = _context.CategoriesProducts.AsNoTracking().FirstOrDefault(c => c.Id == model.Id);
                if (existingCategory != null)
                {
                    model.ImageUrl = existingCategory.ImageUrl;
                }
            }

            _context.CategoriesProducts.Update(model);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        // ──────────────────────────────
        // 3. DELETE - Xóa danh mục sản phẩm
        // ──────────────────────────────

        public IActionResult Delete(int id)
        {
            var category = _context.CategoriesProducts.Find(id);
            if (category != null)
            {
                _context.CategoriesProducts.Remove(category);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}
