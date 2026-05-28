using Microsoft.EntityFrameworkCore;
using duybao.data.Entities;

namespace duybao.data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options) { }

        // Khai báo các b?ng d? li?u
        public DbSet<Category> Categories { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<CategoryProduct> CategoriesProducts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 1. D? li?u m?u b?ng Category
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Tin t?c Công ngh?", Description = "C?p nh?t xu h??ng AI, IoT và l?p trình." },
                new Category { Id = 2, Name = "??i s?ng du l?ch", Description = "Kinh nghi?m ph??t và các ?i?m ??n h?p d?n." },
                new Category { Id = 3, Name = "S?c kh?e Th? thao", Description = "Các bài t?p và ch? ?? ?n u?ng lành m?nh." },
                new Category { Id = 4, Name = "Giáo d?c K? n?ng", Description = "Ph??ng pháp h?c t?p và k? n?ng m?m." },
                new Category { Id = 5, Name = "Góc l?p trình viên", Description = "Tài li?u ASP.NET Core và SQL Server." }
            );

            // 2. D? li?u m?u b?ng Post
            modelBuilder.Entity<Post>().HasData(
                new Post { Id = 1, Title = "L? trình h?c ASP.NET", Content = "H??ng d?n chi ti?t cho ng??i m?i b?t ??u...", ImageUrl = "/img/dotnet.jpg", CategoryId = 5, CreatedDate = new DateTime(2026, 4, 1) },
                new Post { Id = 2, Title = "Top 5 bãi bi?n ??p", Content = "Nh?ng ??a ?i?m không th? b? qua mùa hè này...", ImageUrl = "/img/beach.jpg", CategoryId = 2, CreatedDate = new DateTime(2026, 4, 2) },
                new Post { Id = 3, Title = "Ch?y b? ?úng cách", Content = "L?i ích tuy?t v?i c?a vi?c ch?y b? m?i sáng...", ImageUrl = "/img/run.jpg", CategoryId = 3, CreatedDate = new DateTime(2026, 4, 3) },
                new Post { Id = 4, Title = "AI và t??ng lai", Content = "Trí tu? nhân t?o ?ang thay ??i cu?c s?ng...", ImageUrl = "/img/ai.jpg", CategoryId = 1, CreatedDate = new DateTime(2026, 4, 4) },
                new Post { Id = 5, Title = "K? n?ng Teamwork", Content = "Cách ph?i h?p hi?u qu? trong nhóm ?? án...", ImageUrl = "/img/team.jpg", CategoryId = 4, CreatedDate = new DateTime(2026, 4, 5) }
            );

            // 3. D? li?u m?u b?ng User
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", PasswordHash = "123456", FullName = "Qu?n tr? viên h? th?ng", Role = "Admin" },
                new User { Id = 2, Username = "thai_gv", PasswordHash = "thai1969", FullName = "Nguy?n Cao Thái", Role = "Editor" },
                new User { Id = 3, Username = "sv_01", PasswordHash = "student1", FullName = "Nguy?n V?n A", Role = "User" },
                new User { Id = 4, Username = "sv_02", PasswordHash = "student2", FullName = "Tr?n Th? B", Role = "User" },
                new User { Id = 5, Username = "moderator", PasswordHash = "mod789", FullName = "Lê V?n C", Role = "Moderator" }
            );
        }
    }
}