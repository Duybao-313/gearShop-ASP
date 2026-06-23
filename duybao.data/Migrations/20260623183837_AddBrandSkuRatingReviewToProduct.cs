using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace duybao.data.Migrations
{
    /// <inheritdoc />
    public partial class AddBrandSkuRatingReviewToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Products",
                type: "varchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "Products",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<decimal>(
                name: "DiscountPercentage",
                table: "Products",
                type: "decimal(5,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Rating",
                table: "Products",
                type: "decimal(3,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Sku",
                table: "Products",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReviewerName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReviewerEmail = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reviews_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Brand", "DiscountPercentage", "Rating", "Sku" },
                values: new object[] { "Gucci", 10m, 4.5m, "DAM-GUC-001" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Brand", "DiscountPercentage", "Rating", "Sku" },
                values: new object[] { "Zara", 5m, 4.8m, "VES-ZAR-002" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Brand", "DiscountPercentage", "Rating", "Sku" },
                values: new object[] { "Mango", 15m, 4.2m, "SMI-MAN-003" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Brand", "DiscountPercentage", "Rating", "Sku" },
                values: new object[] { "Uniqlo", 0m, 4.0m, "VAY-UNI-004" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Brand", "DiscountPercentage", "Rating", "Sku" },
                values: new object[] { "Pierre Cardin", 8m, 4.6m, "QUA-PIE-005" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Brand", "DiscountPercentage", "Rating", "Sku" },
                values: new object[] { "Chanel", 12m, 3.9m, "DAM-CHA-006" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Brand", "DiscountPercentage", "Rating", "Sku" },
                values: new object[] { "H&M", 20m, 4.3m, "BLA-HM-007" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Brand", "DiscountPercentage", "Rating", "Sku" },
                values: new object[] { "Pierre Cardin", 0m, 4.1m, "SMI-PIE-008" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Brand", "DiscountPercentage", "Rating", "Sku" },
                values: new object[] { "Gucci", 7m, 4.7m, "VES-GUC-009" });

            migrationBuilder.InsertData(
                table: "Reviews",
                columns: new[] { "Id", "Comment", "CreatedDate", "ProductId", "Rating", "ReviewerEmail", "ReviewerName" },
                values: new object[,]
                {
                    { 1, "Đầm rất đẹp, chất liệu cao cấp!", new DateTime(2026, 6, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 5, null, "Ngọc Trân" },
                    { 2, "Giao hàng nhanh, đóng gói cẩn thận.", new DateTime(2026, 6, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 4, null, "Minh Anh" },
                    { 3, "Vest vừa vặn, đường may sắc nét!", new DateTime(2026, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 5, null, "Quang Huy" },
                    { 4, "Áo đẹp, vải thoáng mát.", new DateTime(2026, 6, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 4, null, "Thanh Hà" },
                    { 5, "Quần tây đẹp, form chuẩn!", new DateTime(2026, 6, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, 5, null, "Đức Anh" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ProductId",
                table: "Reviews",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropColumn(
                name: "Brand",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "DiscountPercentage",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Sku",
                table: "Products");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Products",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldMaxLength: 200)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
