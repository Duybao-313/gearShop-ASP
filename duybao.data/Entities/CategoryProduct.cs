using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
	public class CategoryProduct
	{
		[Key]
		public int Id { get; set; }

		[Required(ErrorMessage = "Tên danh mục không được để trống")]
		[StringLength(100)]
		public string Name { get; set; }

		public string? Description { get; set; }
	[StringLength(500)]
	public string? ImageUrl { get; set; }
		// Quan hệ: Một danh mục có nhiều sản phẩm
		public virtual ICollection<Product>? Products { get; set; }
	}

}
