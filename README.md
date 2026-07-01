# 🎮 DuyBao Gaming Gear — Website Thương Mại Điện Tử

> **Sinh viên:** Phùng Đàm Duy Bảo — MSSV: 2123110487  
> **Công nghệ:** ASP.NET Core 8.0 + ReactJS 19 + MySQL 8.0

---

## 📁 Cấu trúc dự án

```
duybao_solution/
├── duybao.Backend/       # ASP.NET Core 8.0 (API + MVC Admin)
├── duybao.frontend/      # ReactJS SPA (giao diện người dùng)
├── duybao.Data/          # Entity Models + DbContext
└── docs/                 # Tài liệu + báo cáo
```

---

## 🚀 Cách chạy dự án

### Yêu cầu

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [MySQL 8.0](https://dev.mysql.com/downloads/)

### 1. Cấu hình Database

Mở `duybao.Backend/appsettings.json`, sửa chuỗi kết nối nếu cần:

```json
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;port=3306;database=gearshop;user=root;password=root;"
}
```

> Database sẽ tự động được tạo + migrate khi chạy Backend lần đầu.

### 2. Chạy Backend (Port 5228)

```bash
cd duybao.Backend
dotnet run
```

Mở trình duyệt: **http://localhost:5228**

| Trang           | URL                                 |
| --------------- | ----------------------------------- |
| Trang chủ Admin | http://localhost:5228               |
| Đăng nhập       | http://localhost:5228/Account/Login |
| Swagger API     | http://localhost:5228/swagger       |

> **Tài khoản mặc định:** `admin` / `Admin@123`

### 3. Chạy Frontend (Port 3000)

```bash
cd duybao.frontend
npm install
npm start
```

Mở trình duyệt: **http://localhost:3000**

| Trang     | URL                        |
| --------- | -------------------------- |
| Trang chủ | http://localhost:3000      |
| Sản phẩm  | http://localhost:3000/shop |
| Blog      | http://localhost:3000/blog |
| Giỏ hàng  | http://localhost:3000/cart |

---

## 🔧 Công nghệ sử dụng

| Tầng          | Công nghệ                                      |
| ------------- | ---------------------------------------------- |
| Frontend      | ReactJS 19, Axios, React Router                |
| Backend API   | ASP.NET Core 8.0 Web API, Swagger              |
| Backend Admin | ASP.NET Core 8.0 MVC, Razor Views              |
| Database      | MySQL 8.0 + Entity Framework Core (Code First) |
| Auth          | Cookie Authentication + BCrypt                 |

---

## 📸 Tài khoản thử nghiệm

| Vai trò | Username | Password     |
| ------- | -------- | ------------ |
| Admin   | `admin`  | `123456`  |
| Editor  | `editor` | `123456` |
| User    | `user`   | `123456`   |

---

> **Ngày hoàn thành:** 28/06/2026
