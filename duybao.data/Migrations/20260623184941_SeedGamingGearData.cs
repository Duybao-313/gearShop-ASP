using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace duybao.data.Migrations
{
    /// <inheritdoc />
    public partial class SeedGamingGearData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.UpdateData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Chuột chuyên dụng cho game thủ", "Chuột Gaming" });

            migrationBuilder.UpdateData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Bàn phím cơ, switch cao cấp", "Bàn phím Gaming" });

            migrationBuilder.UpdateData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Tai nghe surround, micro chống ồn", "Tai nghe Gaming" });

            migrationBuilder.UpdateData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Lót chuột kích thước lớn, bề mặt tối ưu", "Lót chuột Gaming" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Brand", "CategoryProductId", "Description", "DiscountPercentage", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "Logitech", 1, "Chuột gaming không dây siêu nhẹ 63g, cảm biến HERO 25K, pin 70 giờ.", 12m, "https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-black-gallery-1.png", "Logitech G Pro X Superlight", 3290000m, 4.8m, "LOG-GPX-001", 25 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Brand", "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "Razer", 1, "Chuột gaming công thái học 59g, cảm biến Focus Pro 30K, switch quang học thế hệ 3.", "https://assets2.razerzone.com/images/pnx.assets/57c7af3e20e8a7b27b5a0e3a21e6a2b2/razer-deathadder-v3.png", "Razer DeathAdder V3", 2190000m, 4.6m, "RAZ-DAV3-002", 30 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Brand", "CategoryProductId", "Description", "DiscountPercentage", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "Corsair", 1, "Chuột MMO 17 nút lập trình, cảm biến 18.000 DPI, Key Slider điều chỉnh bàn phím số.", 0m, "https://www.corsair.com/medias/sys_master/images/images/hf7/h6f/9540533280798/-CH-9304211-NA-Gallery-SCIMITAR-RGB-ELITE-01.png", "Corsair Scimitar RGB Elite", 1890000m, 4.3m, "COR-SCI-003", 15 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Brand", "CategoryProductId", "Description", "DiscountPercentage", "ImageUrl", "Name", "Price", "Rating", "Sku" },
                values: new object[] { "Corsair", 2, "Bàn phím cơ Cherry MX, switch PBT doubleshot, RGB per-key, khung nhôm.", 10m, "https://www.corsair.com/medias/sys_master/images/images/h9b/hcd/9540513792030/-CH-9109412-NA-Gallery-K70-RGB-PRO-01.png", "Corsair K70 RGB PRO", 3490000m, 4.7m, "COR-K70-004" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Brand", "Description", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "Razer", "Bàn phím cơ switch Analog quang học, Rapid Trigger, phím PBT doubleshot.", "https://assets2.razerzone.com/images/pnx.assets/ea2e2da7b6a4e08f8e6a1c2e3d4f5b6c/razer-huntsman-v3-pro.png", "Razer Huntsman V3 Pro", 4890000m, 4.5m, "RAZ-HV3-005", 10 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Brand", "CategoryProductId", "Description", "DiscountPercentage", "ImageUrl", "Name", "Price", "Rating", "Sku" },
                values: new object[] { "Logitech", 2, "Bàn phím cơ không dây low-profile, switch GL Tactile, RGB Lightsync.", 15m, "https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/g915-tkl/g915-tkl-gallery-1.png", "Logitech G915 TKL", 4290000m, 4.4m, "LOG-G915-006" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Brand", "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "HyperX", 3, "Tai nghe không dây 7.1 surround, pin 30 giờ, micro chống ồn, driver 53mm.", "https://media.kingston.com/hyperx/cloud/hhsc1x-ba-xxl/cloud-ii-wireless-gallery-1.jpg", "HyperX Cloud II Wireless", 2690000m, 4.9m, "HYX-CC2-007", 35 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Brand", "CategoryProductId", "Description", "DiscountPercentage", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "SteelSeries", 3, "Tai nghe không dây 360° Spatial Audio, Bluetooth + 2.4GHz, pin 38 giờ.", 10m, "https://media.steelseriescdn.com/thumbs/catalog/items/61486/7a3f3b3b3b3b3b3b3b3b3b3b3b3b3b3b/61486_Arctis_Nova_7_Black_1.png", "SteelSeries Arctis Nova 7", 3190000m, 4.7m, "SS-AN7-008", 18 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Brand", "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "Razer", 3, "Tai nghe không dây eSports, driver TriForce 50mm, microphone HyperClear Super Wideband.", "https://assets2.razerzone.com/images/pnx.assets/5c6b7d8e9f0a1b2c3d4e5f6a7b8c9d0e/razer-blackshark-v2-pro.png", "Razer BlackShark V2 Pro", 3890000m, 4.6m, "RAZ-BSV2-009", 22 });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Brand", "CategoryProductId", "Description", "DiscountPercentage", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[,]
                {
                    { 10, "SteelSeries", 4, "Lót chuột kích thước lớn 900x400mm, bề mặt vải micro-woven, đế cao su chống trượt.", 0m, "https://media.steelseriescdn.com/thumbs/catalog/items/63824/63824_QcK_Heavy_XXL_1.png", "SteelSeries QcK Heavy XXL", 690000m, 4.8m, "SS-QCK-010", 40 },
                    { 11, "Razer", 4, "Lót chuột 940x410mm, bề mặt sợi dệt siêu mịn, tối ưu tracking cho mọi cảm biến.", 5m, "https://assets2.razerzone.com/images/pnx.assets/d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9/razer-gigantus-v2-xxl.png", "Razer Gigantus V2 XXL", 590000m, 4.5m, "RAZ-GIG-011", 35 },
                    { 12, "Logitech", 4, "Lót chuột 900x400mm, bề mặt tối ưu cho game thủ, tương thích Logitech G Powerplay.", 10m, "https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/g840-xl/g840-xl-gallery-1.png", "Logitech G840 XL", 790000m, 4.3m, "LOG-G840-012", 20 }
                });

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Comment", "ReviewerName" },
                values: new object[] { "Chuột quá nhẹ, cảm giác cầm cực tốt!", "GamerPro99" });

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Comment", "ReviewerName" },
                values: new object[] { "Pin trâu, không dây nhưng không lag.", "TechReviewer" });

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Comment", "ProductId", "ReviewerName" },
                values: new object[] { "Switch Cherry êm, build chắc tay!", 4, "KeyboardFan" });

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Comment", "ProductId", "Rating", "ReviewerName" },
                values: new object[] { "Âm thanh surround cực hay, đeo lâu không đau tai.", 7, 5, "SoundMaster" });

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Comment", "ProductId", "ReviewerName" },
                values: new object[] { "Lót chuột to, bề mặt mịn, rê chuột không bị cấn.", 10, "MousePadKing" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.UpdateData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Thoải mái, dễ chịu cho những ngày ở nhà", "Trang phục nữ mặc ở nhà" });

            migrationBuilder.UpdateData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Lịch lãm và chuyên nghiệp cho phái mạnh", "Vest & Âu phục nam" });

            migrationBuilder.UpdateData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Sang trọng cho những dịp đặc biệt", "Đầm dạ hội quý phái" });

            migrationBuilder.UpdateData(
                table: "CategoriesProducts",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Thanh lịch và tinh tế cho nữ công sở", "Thời trang công sở nữ" });

            migrationBuilder.InsertData(
                table: "CategoriesProducts",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { 5, "Hoàn thiện phong cách của bạn", "Phụ kiện thời trang" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Brand", "CategoryProductId", "Description", "DiscountPercentage", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "Gucci", 3, null, 10m, "https://placehold.co/400x500/eee/999?text=Đầm+Dạ+Hội", "Đầm dạ hội quý phái", 2400000m, 4.5m, "DAM-GUC-001", 15 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Brand", "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "Zara", 2, null, "https://placehold.co/400x500/eee/999?text=Vest+Nam", "Vest nam cao cấp", 3200000m, 4.8m, "VES-ZAR-002", 10 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Brand", "CategoryProductId", "Description", "DiscountPercentage", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "Mango", 4, null, 15m, "https://placehold.co/400x500/eee/999?text=Sơ+Mi+Nữ", "Áo sơ mi công sở nữ", 550000m, 4.2m, "SMI-MAN-003", 25 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Brand", "CategoryProductId", "Description", "DiscountPercentage", "ImageUrl", "Name", "Price", "Rating", "Sku" },
                values: new object[] { "Uniqlo", 4, null, 0m, "https://placehold.co/400x500/eee/999?text=Chân+Váy", "Chân váy bút chì", 680000m, 4.0m, "VAY-UNI-004" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Brand", "Description", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "Pierre Cardin", null, "https://placehold.co/400x500/eee/999?text=Quần+Tây", "Quần tây nam", 890000m, 4.6m, "QUA-PIE-005", 18 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Brand", "CategoryProductId", "Description", "DiscountPercentage", "ImageUrl", "Name", "Price", "Rating", "Sku" },
                values: new object[] { "Chanel", 4, null, 12m, "https://placehold.co/400x500/eee/999?text=Đầm+Công+Sở", "Đầm công sở thanh lịch", 1250000m, 3.9m, "DAM-CHA-006" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Brand", "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "H&M", 1, null, "https://placehold.co/400x500/eee/999?text=Blazer+Nữ", "Áo blazer nữ", 1850000m, 4.3m, "BLA-HM-007", 8 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Brand", "CategoryProductId", "Description", "DiscountPercentage", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "Pierre Cardin", 2, null, 0m, "https://placehold.co/400x500/eee/999?text=Sơ+Mi+Trắng", "Sơ mi nam trắng", 450000m, 4.1m, "SMI-PIE-008", 30 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Brand", "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "Rating", "Sku", "StockQuantity" },
                values: new object[] { "Gucci", 4, null, "https://placehold.co/400x500/eee/999?text=Vest+Nữ", "Bộ vest nữ công sở", 2800000m, 4.7m, "VES-GUC-009", 7 });

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Comment", "ReviewerName" },
                values: new object[] { "Đầm rất đẹp, chất liệu cao cấp!", "Ngọc Trân" });

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Comment", "ReviewerName" },
                values: new object[] { "Giao hàng nhanh, đóng gói cẩn thận.", "Minh Anh" });

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Comment", "ProductId", "ReviewerName" },
                values: new object[] { "Vest vừa vặn, đường may sắc nét!", 2, "Quang Huy" });

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Comment", "ProductId", "Rating", "ReviewerName" },
                values: new object[] { "Áo đẹp, vải thoáng mát.", 3, 4, "Thanh Hà" });

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Comment", "ProductId", "ReviewerName" },
                values: new object[] { "Quần tây đẹp, form chuẩn!", 5, "Đức Anh" });
        }
    }
}
