using Microsoft.EntityFrameworkCore;
using duybao.data.Entities;

namespace duybao.data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options) { }

        // Khai b�o c�c b?ng d? li?u
        public DbSet<Category> Categories { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<CategoryProduct> CategoriesProducts { get; set; }
        public DbSet<Product> Products { get; set; }        public DbSet<Review> Reviews { get; set; }        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ⚠️ TẤT CẢ SEED DATA ĐÃ CHUYỂN SANG docs/import-dummyjson.sql
            // Chạy file SQL đó để nạp dữ liệu sau khi migrate database
        }
    }
}