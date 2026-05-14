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
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;

        public int CustomerId { get; set; }

        public int Status { get; set; } // 0: Ch? duy?t, 1: ?ang giao, 2: ?ã xong

        public string? Notes { get; set; }

        [ForeignKey("CustomerId")] 
        public virtual Customer? Customer { get; set; }

        public virtual ICollection<OrderDetail>? OrderDetails { get; set; }
    }
}
