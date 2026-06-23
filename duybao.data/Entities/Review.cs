using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace duybao.data.Entities
{
    /*
 -sinh vien :Phung Dam Duy Bao
 -mssv: 2123110487
 -ngay tao: 24/6/2026
 -version: 1.0
 -mo ta: Entity danh gia san pham (1 Product : N Reviews)
 */
    public class Review
    {
        [Key]
        public int Id { get; set; }

        // Khóa ngoại tới Product
        public int ProductId { get; set; }

        [ForeignKey("ProductId")]
        public virtual Product? Product { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        [StringLength(1000)]
        public string? Comment { get; set; }

        [StringLength(100)]
        public string? ReviewerName { get; set; }

        [StringLength(200)]
        public string? ReviewerEmail { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
