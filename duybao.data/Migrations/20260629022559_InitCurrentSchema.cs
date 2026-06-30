using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace duybao.data.Migrations
{
    /// <inheritdoc />
    public partial class InitCurrentSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Dùng SQL thô để tránh lỗi "duplicate column" khi DB đã có schema
            // Thêm cột UserId vào bảng Customers (FK tới Users) nếu chưa tồn tại
            migrationBuilder.Sql(@"
                SET @col_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
                    WHERE TABLE_SCHEMA='gearshop' AND TABLE_NAME='Customers' AND COLUMN_NAME='UserId');
                SET @sql = IF(@col_exists = 0, 
                    'ALTER TABLE `Customers` ADD `UserId` int NOT NULL DEFAULT 0', 
                    'SELECT ''UserId column already exists''');
                PREPARE stmt FROM @sql;
                EXECUTE stmt;
                DEALLOCATE PREPARE stmt;
            ");

            // Tạo index cho UserId nếu chưa tồn tại
            migrationBuilder.Sql(@"
                SET @idx_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS 
                    WHERE TABLE_SCHEMA='gearshop' AND TABLE_NAME='Customers' AND INDEX_NAME='IX_Customers_UserId');
                SET @sql = IF(@idx_exists = 0, 
                    'CREATE INDEX `IX_Customers_UserId` ON `Customers` (`UserId`)', 
                    'SELECT ''IX_Customers_UserId already exists''');
                PREPARE stmt FROM @sql;
                EXECUTE stmt;
                DEALLOCATE PREPARE stmt;
            ");

            // Thêm foreign key nếu chưa tồn tại (sau khi đã dọn dữ liệu mồ côi)
            migrationBuilder.Sql(@"
                -- Xóa Customer không có User tương ứng (mồ côi)
                DELETE FROM `Customers` WHERE `UserId` NOT IN (SELECT `Id` FROM `Users`);
                
                SET @fk_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
                    WHERE TABLE_SCHEMA='gearshop' AND TABLE_NAME='Customers' AND CONSTRAINT_NAME='FK_Customers_Users_UserId');
                SET @sql = IF(@fk_exists = 0, 
                    'ALTER TABLE `Customers` ADD CONSTRAINT `FK_Customers_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE', 
                    'SELECT ''FK_Customers_Users_UserId already exists''');
                PREPARE stmt FROM @sql;
                EXECUTE stmt;
                DEALLOCATE PREPARE stmt;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Bỏ qua Down - không xóa schema khi rollback
        }
    }
}
