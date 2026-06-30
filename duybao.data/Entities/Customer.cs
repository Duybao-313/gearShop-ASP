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
 -version: 1.0
 */
	// Kh�ch h�ng
	public class Customer
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }

        [Required]
        public string Password { get; set; } // = User.PasswordHash

        public virtual ICollection<Order>? Orders { get; set; }
    }
}
