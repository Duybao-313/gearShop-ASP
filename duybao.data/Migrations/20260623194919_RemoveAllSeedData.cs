using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace duybao.data.Migrations
{
    /// <inheritdoc />
    public partial class RemoveAllSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 5);

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
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Cập nhật những xu hướng thời trang mới nhất", "Xu hướng thời trang" },
                    { 2, "Mẹo phối đồ phong cách và ấn tượng", "Bí quyết phối đồ" },
                    { 3, "Thông tin sự kiện và ưu đãi đặc biệt", "Sự kiện & Khuyến mãi" },
                    { 4, "Chia sẻ bí quyết chăm sóc sắc đẹp", "Tư vấn làm đẹp" },
                    { 5, "Tài liệu ASP.NET Core và SQL Server.", "Góc lập trình viên" }
                });

            migrationBuilder.InsertData(
                table: "CategoriesProducts",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Chuột chuyên dụng cho game thủ", "Chuột Gaming" },
                    { 2, "Bàn phím cơ, switch cao cấp", "Bàn phím Gaming" },
                    { 3, "Tai nghe surround, micro chống ồn", "Tai nghe Gaming" },
                    { 4, "Lót chuột kích thước lớn, bề mặt tối ưu", "Lót chuột Gaming" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "FullName", "PasswordHash", "Role", "Username" },
                values: new object[,]
                {
                    { 1, "Quản trị viên hệ thống", "123456", "Admin", "admin" },
                    { 2, "Nguyễn Cao Thái", "thai1969", "Editor", "thai_gv" },
                    { 3, "Nguyễn Văn A", "student1", "User", "sv_01" },
                    { 4, "Trần Thị B", "student2", "User", "sv_02" },
                    { 5, "Lê Văn C", "mod789", "Moderator", "moderator" }
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "CategoryId", "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[,]
                {
                    { 1, 2, "Khám phá những bí quyết phối đồ công sở giúp bạn luôn thanh lịch và chuyên nghiệp.", new DateTime(2026, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://placehold.co/600x350/ffe0e0/999?text=Thời+Trang+Nữ", "Bí quyết phối đồ công sở thanh lịch cho nữ" },
                    { 2, 1, "Cập nhật những xu hướng vest nam mới nhất năm 2026.", new DateTime(2026, 6, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://placehold.co/600x350/e0e0ff/999?text=Vest+Nam+2026", "Xu hướng vest nam 2026 - Lịch lãm và hiện đại" },
                    { 3, 1, "Cách chọn đầm dạ hội phù hợp với vóc dáng và phong cách.", new DateTime(2026, 6, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://placehold.co/600x350/ffe0ff/999?text=Đầm+Dạ+Hội", "Đầm dạ hội - Lựa chọn hoàn hảo cho mọi sự kiện" },
                    { 4, 4, "Xu hướng thời trang bền vững đang len lỏi vào môi trường công sở.", new DateTime(2026, 6, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://placehold.co/600x350/e0ffe0/999?text=Công+Sở+Bền+Vững", "Phong cách thời trang công sở bền vững" },
                    { 5, 4, "Từ túi xách, giày dép đến trang sức - những phụ kiện giúp bạn hoàn thiện phong cách.", new DateTime(2026, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://placehold.co/600x350/fff0e0/999?text=Phụ+Kiện", "Phụ kiện thời trang không thể thiếu cho nữ" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Brand", "CategoryProductId", "Description", "DiscountPercentage", "ImageUrl", "Images", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[,]
                {
                    { 1, "Logitech", 1, "Chuột gaming không dây siêu nhẹ 63g, cảm biến HERO 25K, pin 70 giờ.", 12m, "https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-black-gallery-1.png", null, "Logitech G Pro X Superlight", 3290000m, 4.8m, "LOG-GPX-001", 25 },
                    { 2, "Razer", 1, "Chuột gaming công thái học 59g, cảm biến Focus Pro 30K, switch quang học thế hệ 3.", 5m, "https://assets2.razerzone.com/images/pnx.assets/57c7af3e20e8a7b27b5a0e3a21e6a2b2/razer-deathadder-v3.png", null, "Razer DeathAdder V3", 2190000m, 4.6m, "RAZ-DAV3-002", 30 },
                    { 3, "Corsair", 1, "Chuột MMO 17 nút lập trình, cảm biến 18.000 DPI, Key Slider điều chỉnh bàn phím số.", 0m, "https://www.corsair.com/medias/sys_master/images/images/hf7/h6f/9540533280798/-CH-9304211-NA-Gallery-SCIMITAR-RGB-ELITE-01.png", null, "Corsair Scimitar RGB Elite", 1890000m, 4.3m, "COR-SCI-003", 15 },
                    { 4, "Corsair", 2, "Bàn phím cơ Cherry MX, switch PBT doubleshot, RGB per-key, khung nhôm.", 10m, "https://www.corsair.com/medias/sys_master/images/images/h9b/hcd/9540513792030/-CH-9109412-NA-Gallery-K70-RGB-PRO-01.png", null, "Corsair K70 RGB PRO", 3490000m, 4.7m, "COR-K70-004", 20 },
                    { 5, "Razer", 2, "Bàn phím cơ switch Analog quang học, Rapid Trigger, phím PBT doubleshot.", 8m, "https://assets2.razerzone.com/images/pnx.assets/ea2e2da7b6a4e08f8e6a1c2e3d4f5b6c/razer-huntsman-v3-pro.png", null, "Razer Huntsman V3 Pro", 4890000m, 4.5m, "RAZ-HV3-005", 10 },
                    { 6, "Logitech", 2, "Bàn phím cơ không dây low-profile, switch GL Tactile, RGB Lightsync.", 15m, "https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/g915-tkl/g915-tkl-gallery-1.png", null, "Logitech G915 TKL", 4290000m, 4.4m, "LOG-G915-006", 12 },
                    { 7, "HyperX", 3, "Tai nghe không dây 7.1 surround, pin 30 giờ, micro chống ồn, driver 53mm.", 20m, "https://media.kingston.com/hyperx/cloud/hhsc1x-ba-xxl/cloud-ii-wireless-gallery-1.jpg", null, "HyperX Cloud II Wireless", 2690000m, 4.9m, "HYX-CC2-007", 35 },
                    { 8, "SteelSeries", 3, "Tai nghe không dây 360° Spatial Audio, Bluetooth + 2.4GHz, pin 38 giờ.", 10m, "https://media.steelseriescdn.com/thumbs/catalog/items/61486/7a3f3b3b3b3b3b3b3b3b3b3b3b3b3b3b/61486_Arctis_Nova_7_Black_1.png", null, "SteelSeries Arctis Nova 7", 3190000m, 4.7m, "SS-AN7-008", 18 },
                    { 9, "Razer", 3, "Tai nghe không dây eSports, driver TriForce 50mm, microphone HyperClear Super Wideband.", 7m, "https://assets2.razerzone.com/images/pnx.assets/5c6b7d8e9f0a1b2c3d4e5f6a7b8c9d0e/razer-blackshark-v2-pro.png", null, "Razer BlackShark V2 Pro", 3890000m, 4.6m, "RAZ-BSV2-009", 22 },
                    { 10, "SteelSeries", 4, "Lót chuột kích thước lớn 900x400mm, bề mặt vải micro-woven, đế cao su chống trượt.", 0m, "https://media.steelseriescdn.com/thumbs/catalog/items/63824/63824_QcK_Heavy_XXL_1.png", null, "SteelSeries QcK Heavy XXL", 690000m, 4.8m, "SS-QCK-010", 40 },
                    { 11, "Razer", 4, "Lót chuột 940x410mm, bề mặt sợi dệt siêu mịn, tối ưu tracking cho mọi cảm biến.", 5m, "https://assets2.razerzone.com/images/pnx.assets/d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9/razer-gigantus-v2-xxl.png", null, "Razer Gigantus V2 XXL", 590000m, 4.5m, "RAZ-GIG-011", 35 },
                    { 12, "Logitech", 4, "Lót chuột 900x400mm, bề mặt tối ưu cho game thủ, tương thích Logitech G Powerplay.", 10m, "https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/g840-xl/g840-xl-gallery-1.png", null, "Logitech G840 XL", 790000m, 4.3m, "LOG-G840-012", 20 }
                });

            migrationBuilder.InsertData(
                table: "Reviews",
                columns: new[] { "Id", "Comment", "CreatedDate", "ProductId", "Rating", "ReviewerEmail", "ReviewerName" },
                values: new object[,]
                {
                    { 1, "Chuột quá nhẹ, cảm giác cầm cực tốt!", new DateTime(2026, 6, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 5, null, "GamerPro99" },
                    { 2, "Pin trâu, không dây nhưng không lag.", new DateTime(2026, 6, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 4, null, "TechReviewer" },
                    { 3, "Switch Cherry êm, build chắc tay!", new DateTime(2026, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 5, null, "KeyboardFan" },
                    { 4, "Âm thanh surround cực hay, đeo lâu không đau tai.", new DateTime(2026, 6, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, 5, null, "SoundMaster" },
                    { 5, "Lót chuột to, bề mặt mịn, rê chuột không bị cấn.", new DateTime(2026, 6, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 10, 5, null, "MousePadKing" }
                });
        }
    }
}
