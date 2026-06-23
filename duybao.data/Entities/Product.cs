using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace duybao.data.Entities
{
    /*
 -sinh vien :Phung Dam Duy Bao
 -mssv: 2123110487
 -ngay tao: 14/5/2026
 -version: 2.0
 -mo ta: Them Brand, Sku, Rating, DiscountPercentage, Reviews, Images (JSON)
 */
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên sản phẩm không được để trống")]
        [StringLength(200)]
        public string Name { get; set; }

        public string? Description { get; set; }

        [Range(0, double.MaxValue)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        // ─────── Giảm giá (%) ───────
        [Range(0, 100)]
        [Column(TypeName = "decimal(5,2)")]
        public decimal DiscountPercentage { get; set; } = 0;

        // ─────── Đánh giá trung bình (0-5 sao) ───────
        [Range(0, 5)]
        [Column(TypeName = "decimal(3,2)")]
        public decimal Rating { get; set; } = 0;

        public int StockQuantity { get; set; }

        // ─────── Ảnh đại diện (thumbnail) ───────
        public string? ImageUrl { get; set; }

        // ─────── Danh sách ảnh (JSON array, tương thích DummyJSON) ───────
        [Column(TypeName = "LONGTEXT")]
        public string? Images { get; set; }

        // ─────── Thương hiệu ───────
        [StringLength(100)]
        public string? Brand { get; set; }

        // ─────── Mã SKU ───────
        [StringLength(50)]
        public string? Sku { get; set; }

        // Khóa ngoại nối tới CategoryProduct
        public int CategoryProductId { get; set; }

        [ForeignKey("CategoryProductId")]
        public virtual CategoryProduct? CategoryProduct { get; set; }

        // ─────── Danh sách đánh giá (1:N) ───────
        public virtual ICollection<Review>? Reviews { get; set; }

        // ─────── Helper: Parse Images JSON → List<string> ───────
        [NotMapped]
        public List<string> ImageList
        {
            get
            {
                if (string.IsNullOrEmpty(Images))
                    return new List<string>();
                try { return System.Text.Json.JsonSerializer.Deserialize<List<string>>(Images) ?? new List<string>(); }
                catch { return new List<string>(); }
            }
            set
            {
                Images = System.Text.Json.JsonSerializer.Serialize(value);
            }
        }
    }
}
