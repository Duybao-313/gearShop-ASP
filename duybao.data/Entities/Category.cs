using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
/*
 -sinh vien :Phung Dam Duy Bao
 -mssv: 2123110487
 -ngay tao: 14/5/2026
 -version: 1.0
 */

namespace duybao.data.Entities
{
	//danh muc bai viet
	public class Category
    {
		public int Id { get; set; } //ma danh muc, khoa chinh
		public string Name { get; set; }  //ten danh muc
		public string Description { get; set; } //mo ta danh muc
		public virtual ICollection<Post> Posts { get; set; } //danh sach bai viet thuoc danh muc
	}
}
