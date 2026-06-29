using System;
using System.Collections.Generic;
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
	public class User
	{
		public int Id { get; set; }
		public string Username { get; set; }
		public string PasswordHash { get; set; }
		public string FullName { get; set; }
		public string Role { get; set; } // Admin, Editor, User

		// Navigation: 1-1 với Customer
		public virtual Customer? Customer { get; set; }
	}

}
