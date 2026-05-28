using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace duybao.data.Migrations
{
	/// <inheritdoc />
	public partial class SeedSampleData : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.InsertData(
				table: "Categories",
				columns: new[] { "Id", "Description", "Name" },
				values: new object[,]
				{
					{ 1, "Cập nhật xu hướng AI, IoT và lập trình.", "Tin tức Công nghệ" },
					{ 2, "Kinh nghiệm phượt và các điểm đến hấp dẫn.", "Đời sống du lịch" },
					{ 3, "Các bài tập và chế độ ăn uống lành mạnh.", "Sức khỏe Thể thao" },
					{ 4, "Phương pháp học tập và kỹ năng mềm.", "Giáo dục Kỹ năng" },
					{ 5, "Tài liệu ASP.NET Core và SQL Server.", "Góc lập trình viên" }
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
					{ 1, 5, "Hướng dẫn chi tiết cho người mới bắt đầu...", new DateTime(2026, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/dotnet.jpg", "Lộ trình học ASP.NET" },
					{ 2, 2, "Những địa điểm không thể bỏ qua mùa hè này...", new DateTime(2026, 4, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/beach.jpg", "Top 5 bãi biển đẹp" },
					{ 3, 3, "Lợi ích tuyệt vời của việc chạy bộ mỗi sáng...", new DateTime(2026, 4, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/run.jpg", "Chạy bộ đúng cách" },
					{ 4, 1, "Trí tuệ nhân tạo đang thay đổi cuộc sống...", new DateTime(2026, 4, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/ai.jpg", "AI và tương lai" },
					{ 5, 4, "Cách phối hợp hiệu quả trong nhóm dự án...", new DateTime(2026, 4, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/team.jpg", "Kỹ năng Teamwork" }
				});
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DeleteData(table: "Posts", keyColumn: "Id", keyValue: 1);
			migrationBuilder.DeleteData(table: "Posts", keyColumn: "Id", keyValue: 2);
			migrationBuilder.DeleteData(table: "Posts", keyColumn: "Id", keyValue: 3);
			migrationBuilder.DeleteData(table: "Posts", keyColumn: "Id", keyValue: 4);
			migrationBuilder.DeleteData(table: "Posts", keyColumn: "Id", keyValue: 5);

			migrationBuilder.DeleteData(table: "Users", keyColumn: "Id", keyValue: 1);
			migrationBuilder.DeleteData(table: "Users", keyColumn: "Id", keyValue: 2);
			migrationBuilder.DeleteData(table: "Users", keyColumn: "Id", keyValue: 3);
			migrationBuilder.DeleteData(table: "Users", keyColumn: "Id", keyValue: 4);
			migrationBuilder.DeleteData(table: "Users", keyColumn: "Id", keyValue: 5);

			migrationBuilder.DeleteData(table: "Categories", keyColumn: "Id", keyValue: 1);
			migrationBuilder.DeleteData(table: "Categories", keyColumn: "Id", keyValue: 2);
			migrationBuilder.DeleteData(table: "Categories", keyColumn: "Id", keyValue: 3);
			migrationBuilder.DeleteData(table: "Categories", keyColumn: "Id", keyValue: 4);
			migrationBuilder.DeleteData(table: "Categories", keyColumn: "Id", keyValue: 5);
		}
	}
}
