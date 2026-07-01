using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using duybao.data;

var builder = WebApplication.CreateBuilder(args);

// ==============================================================
//  1. KHU VỰC ĐĂNG KÝ DỊCH VỤ (SERVICES CONTAINER)
// ==============================================================

builder.Services.AddControllersWithViews();

// Đăng ký dịch vụ lõi giúp hệ thống tự động bóc tách thông tin Endpoint phục vụ Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // -- Kích hoạt bộ sinh tài liệu API Swagger

// Khai báo dịch vụ xác thực Cookie
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
        options.ExpireTimeSpan = TimeSpan.FromDays(30);      // Cookie sống 30 ngày
        options.SlidingExpiration = true;                     // Gia hạn cookie khi còn hoạt động
        options.Cookie.SameSite = SameSiteMode.Lax;            // Same-site: localhost:3000 và localhost:5228 là cùng site
        options.Cookie.SecurePolicy = CookieSecurePolicy.None; // HTTP localhost (production cần đổi thành Always)
    });

// ---- CẤU HÌNH CORS (THÊM VÀO TRƯỚC builder.Build()) ----
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001") // Cho phép ReactJS gọi tới
              .AllowAnyHeader()                     // Cho phép mọi loại Header (Content-Type, Authorization...)
              .AllowAnyMethod()                     // Cho phép mọi phương thức HTTP (GET, POST, PUT, DELETE)
              .AllowCredentials();                  // Hỗ trợ truyền Cookie/Session nếu cần sau này
    });
});

// Đăng ký Email Service (Brevo API) - gửi email xác nhận đơn hàng
builder.Services.AddHttpClient<duybao.Backend.Services.IEmailService, duybao.Backend.Services.EmailService>();

// Đăng ký DbContext vào hệ thống với MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

var app = builder.Build();

// Tự động áp dụng các Migration vào database mỗi khi khởi chạy ứng dụng
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var dbContext = services.GetRequiredService<ApplicationDbContext>();
        dbContext.Database.Migrate(); // Tự động tạo bảng/cập nhật database
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Có lỗi xảy ra khi tạo hoặc cập nhật Database.");
    }
}

// ==============================================================
//  2. KHU VỰC CẤU HÌNH MIDDLEWARE (REQUEST PIPELINE)
// ==============================================================

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "BaoCMS Web API v1");
    c.RoutePrefix = "swagger"; // -- Đường dẫn truy cập mặc định sẽ là /swagger
});

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// [VỊ TRÍ ĐẶT CORS]: Phải nằm ngay giữa UseRouting và UseAuthentication/UseAuthorization
app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

// ==============================================================
//  3. KHU VỰC ĐỊNH TUYẾN PHÂN LUỒNG (ROUTING MAP)
// ==============================================================

// Phân luồng A: Ánh xạ các Endpoint API tuân thủ theo cấu trúc [Route("api/[controller]")]
app.MapControllers();

// Phân luồng B: Giữ lại bản đồ đường đi mặc định cho trang giao diện Web MVC cũ
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
