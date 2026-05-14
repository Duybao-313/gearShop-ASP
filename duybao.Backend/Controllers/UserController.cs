using Microsoft.AspNetCore.Mvc;
using duybao.data.Entities;

namespace duybao.Backend.Controllers
{
    public class UserController : Controller
    {
        // Hàm Index: Hi?n th? danh sách thành viên qu?n tr?
        public IActionResult Index()
        {
            // 1. T?o danh sách Ng??i dùng gi? (Mock Data)
            var users = new List<User>
            {
                new User 
                { 
                    Id = 1, 
                    Username = "admin_thai", 
                    FullName = "Nguy?n Cao Thái", 
                    Role = "Administrator" 
                },
                new User 
                { 
                    Id = 2, 
                    Username = "editor_01", 
                    FullName = "Tr?n V?n Biên T?p", 
                    Role = "Editor" 
                },
                new User 
                { 
                    Id = 3, 
                    Username = "author_minh", 
                    FullName = "Lê Quang Minh", 
                    Role = "Author" 
                }
            };

            // 2. Tr? v? View kèm theo danh sách ng??i dùng
            return View(users);
        }
    }
}
