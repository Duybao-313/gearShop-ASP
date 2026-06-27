using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace duybao.data.Migrations
{
    /// <inheritdoc />
    public partial class SeedFashionData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Xóa dữ liệu sản phẩm và danh mục cũ để tránh trùng khóa chính
            migrationBuilder.Sql("DELETE FROM `OrderDetails` WHERE `ProductId` > 0");
            migrationBuilder.Sql("DELETE FROM `Products` WHERE `Id` > 0");
            migrationBuilder.Sql("DELETE FROM `CategoriesProducts` WHERE `Id` > 0");
            // Reset auto-increment
            migrationBuilder.Sql("ALTER TABLE `Products` AUTO_INCREMENT = 1");
            migrationBuilder.Sql("ALTER TABLE `CategoriesProducts` AUTO_INCREMENT = 1");
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Cập nhật những xu hướng thời trang mới nhất", "Xu hướng thời trang" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Mẹo phối đồ phong cách và ấn tượng", "Bí quyết phối đồ" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Thông tin sự kiện và ưu đãi đặc biệt", "Sự kiện & Khuyến mãi" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Chia sẻ bí quyết chăm sóc sắc đẹp", "Tư vấn làm đẹp" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Tài liệu ASP.NET Core và SQL Server.", "Góc lập trình viên" });

            migrationBuilder.InsertData(
                table: "CategoriesProducts",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Thoải mái, dễ chịu cho những ngày ở nhà", "Trang phục nữ mặc ở nhà" },
                    { 2, "Lịch lãm và chuyên nghiệp cho phái mạnh", "Vest & Âu phục nam" },
                    { 3, "Sang trọng cho những dịp đặc biệt", "Đầm dạ hội quý phái" },
                    { 4, "Thanh lịch và tinh tế cho nữ công sở", "Thời trang công sở nữ" },
                    { 5, "Hoàn thiện phong cách của bạn", "Phụ kiện thời trang" }
                });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CategoryId", "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { 2, "Khám phá những bí quyết phối đồ công sở giúp bạn luôn thanh lịch và chuyên nghiệp.", new DateTime(2026, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://placehold.co/600x350/ffe0e0/999?text=Thời+Trang+Nữ", "Bí quyết phối đồ công sở thanh lịch cho nữ" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CategoryId", "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { 1, "Cập nhật những xu hướng vest nam mới nhất năm 2026.", new DateTime(2026, 6, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://placehold.co/600x350/e0e0ff/999?text=Vest+Nam+2026", "Xu hướng vest nam 2026 - Lịch lãm và hiện đại" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { 1, "Cách chọn đầm dạ hội phù hợp với vóc dáng và phong cách.", new DateTime(2026, 6, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://placehold.co/600x350/ffe0ff/999?text=Đầm+Dạ+Hội", "Đầm dạ hội - Lựa chọn hoàn hảo cho mọi sự kiện" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CategoryId", "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { 4, "Xu hướng thời trang bền vững đang len lỏi vào môi trường công sở.", new DateTime(2026, 6, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://placehold.co/600x350/e0ffe0/999?text=Công+Sở+Bền+Vững", "Phong cách thời trang công sở bền vững" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { "Từ túi xách, giày dép đến trang sức - những phụ kiện giúp bạn hoàn thiện phong cách.", new DateTime(2026, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://placehold.co/600x350/fff0e0/999?text=Phụ+Kiện", "Phụ kiện thời trang không thể thiếu cho nữ" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "FullName",
                value: "Quản trị viên hệ thống");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "FullName",
                value: "Nguyễn Cao Thái");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "FullName",
                value: "Nguyễn Văn A");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "FullName",
                value: "Trần Thị B");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "FullName",
                value: "Lê Văn C");

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[,]
                {
                    { 1, 3, null, "https://placehold.co/400x500/eee/999?text=Đầm+Dạ+Hội", "Đầm dạ hội quý phái", 2400000m, 15 },
                    { 2, 2, null, "https://placehold.co/400x500/eee/999?text=Vest+Nam", "Vest nam cao cấp", 3200000m, 10 },
                    { 3, 4, null, "https://placehold.co/400x500/eee/999?text=Sơ+Mi+Nữ", "Áo sơ mi công sở nữ", 550000m, 25 },
                    { 4, 4, null, "https://placehold.co/400x500/eee/999?text=Chân+Váy", "Chân váy bút chì", 680000m, 20 },
                    { 5, 2, null, "https://placehold.co/400x500/eee/999?text=Quần+Tây", "Quần tây nam", 890000m, 18 },
                    { 6, 4, null, "https://placehold.co/400x500/eee/999?text=Đầm+Công+Sở", "Đầm công sở thanh lịch", 1250000m, 12 },
                    { 7, 1, null, "https://placehold.co/400x500/eee/999?text=Blazer+Nữ", "Áo blazer nữ", 1850000m, 8 },
                    { 8, 2, null, "https://placehold.co/400x500/eee/999?text=Sơ+Mi+Trắng", "Sơ mi nam trắng", 450000m, 30 },
                    { 9, 4, null, "https://placehold.co/400x500/eee/999?text=Vest+Nữ", "Bộ vest nữ công sở", 2800000m, 7 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name" },
                values: new object[] { "C?p nh?t xu h??ng AI, IoT và l?p trình.", "Tin t?c Công ngh?" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Kinh nghi?m ph??t và các ?i?m ??n h?p d?n.", "??i s?ng du l?ch" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Các bài t?p và ch? ?? ?n u?ng lành m?nh.", "S?c kh?e Th? thao" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Ph??ng pháp h?c t?p và k? n?ng m?m.", "Giáo d?c K? n?ng" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Tài li?u ASP.NET Core và SQL Server.", "Góc l?p trình viên" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CategoryId", "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { 5, "H??ng d?n chi ti?t cho ng??i m?i b?t ??u...", new DateTime(2026, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/dotnet.jpg", "L? trình h?c ASP.NET" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CategoryId", "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { 2, "Nh?ng ??a ?i?m không th? b? qua mùa hè này...", new DateTime(2026, 4, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/beach.jpg", "Top 5 bãi bi?n ??p" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { 3, "L?i ích tuy?t v?i c?a vi?c ch?y b? m?i sáng...", new DateTime(2026, 4, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/run.jpg", "Ch?y b? ?úng cách" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CategoryId", "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { 1, "Trí tu? nhân t?o ?ang thay ??i cu?c s?ng...", new DateTime(2026, 4, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/ai.jpg", "AI và t??ng lai" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { "Cách ph?i h?p hi?u qu? trong nhóm ?? án...", new DateTime(2026, 4, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/team.jpg", "K? n?ng Teamwork" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "FullName",
                value: "Qu?n tr? viên h? th?ng");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "FullName",
                value: "Nguy?n Cao Thái");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "FullName",
                value: "Nguy?n V?n A");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "FullName",
                value: "Tr?n Th? B");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "FullName",
                value: "Lê V?n C");
        }
    }
}
