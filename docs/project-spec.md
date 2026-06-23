# 📋 Đặc Tả Dự Án (Project Specification)

> **Dự án:** ASP.NET Website Đồ Công Nghệ & Gaming Gear  
> **Sinh viên:** Phùng Đàm Duy Bảo — MSSV: 2123110487  
> **Ngày:** 24/06/2026 — Cập nhật: Entity Product v3, tích hợp DummyJSON

---

## 1. Mục Tiêu Dự Án

Xây dựng website thương mại điện tử chuyên bán **đồ công nghệ & gaming gear** kết hợp **hệ thống CMS blog** chia sẻ kiến thức, hướng dẫn và review sản phẩm.

### 1.1 Mục Tiêu Kinh Doanh

| STT | Mục tiêu                                     | Đo lường                                              |
| --- | -------------------------------------------- | ----------------------------------------------------- |
| 1   | Trưng bày sản phẩm gaming gear chuyên nghiệp | Danh mục 4 nhóm: Chuột, Bàn phím, Tai nghe, Lót chuột |
| 2   | Thu hút traffic qua nội dung blog            | Bài viết SEO-friendly về gaming gear                  |
| 3   | Hỗ trợ đặt hàng trực tuyến                   | Giỏ hàng → Đơn hàng → Xác nhận                        |
| 4   | Quản trị dễ dàng                             | Admin CRUD không cần code                             |

### 1.2 Mục Tiêu Kỹ Thuật

| STT | Mục tiêu                  | Yêu cầu                       |
| --- | ------------------------- | ----------------------------- |
| 1   | Backend API chuẩn RESTful | ASP.NET Core 8.0 Web API      |
| 2   | Frontend SPA hiện đại     | React 19, responsive          |
| 3   | Database chuẩn hóa 3NF    | MySQL + EF Core Code First    |
| 4   | Phân quyền rõ ràng        | 3 role: Admin / Editor / User |
| 5   | Tài liệu API tự động      | Swagger UI                    |

---

## 2. Phạm Vi Dự Án

### 2.1 IN SCOPE (Trong Phạm Vi) ✅

| Module                     | Mô tả                                                                | Priority |
| -------------------------- | -------------------------------------------------------------------- | -------- |
| **Trang chủ**              | Banner + Sản phẩm nổi bật + Bài viết mới                             | P0       |
| **Danh sách sản phẩm**     | Grid sản phẩm, filter theo danh mục                                  | P0       |
| **Chi tiết sản phẩm**      | Gallery ảnh, mô tả, giá, Brand, SKU, đánh giá, Reviews               | P0       |
| **Blog / Bài viết**        | Danh sách + Chi tiết bài viết                                        | P0       |
| **Đăng nhập / Phân quyền** | Cookie Auth, 3 role                                                  | P0       |
| **CRUD Sản phẩm (Admin)**  | Thêm/Sửa/Xóa sản phẩm (có Brand, SKU, Rating, Discount, Gallery ảnh) | P0       |
| **CRUD Bài viết (Admin)**  | Thêm/Sửa/Xóa bài viết CMS                                            | P0       |
| **CRUD Danh mục (Admin)**  | Quản lý Category & CategoryProduct                                   | P0       |
| **Quản lý User (Admin)**   | CRUD người dùng hệ thống                                             | P1       |
| **Tìm kiếm sản phẩm**      | Search bar theo tên                                                  | P1       |
| **Swagger API Docs**       | Tài liệu API tự động                                                 | P1       |

### 2.2 OUT OF SCOPE (Ngoài Phạm Vi) ❌

- Thanh toán online (VNPay, Momo, Stripe)
- Chat bot / Live chat hỗ trợ
- Đánh giá & bình luận sản phẩm (Rating, Comment)
- Tích hợp mạng xã hội (Share Facebook, v.v.)
- Mobile App (iOS/Android)
- CI/CD pipeline

---

## 3. Yêu Cầu Chức Năng (Functional Requirements)

### FR-01: Sản Phẩm (Product)

| ID      | Yêu cầu                                                           | Actor |
| ------- | ----------------------------------------------------------------- | ----- |
| FR-01.1 | Xem danh sách tất cả sản phẩm                                     | Guest |
| FR-01.2 | Lọc sản phẩm theo danh mục (Chuột, Bàn phím, Tai nghe, Lót chuột) | Guest |
| FR-01.3 | Xem chi tiết sản phẩm (tên, mô tả, giá, ảnh, tồn kho)             | Guest |
| FR-01.4 | Tìm kiếm sản phẩm theo tên                                        | Guest |
| FR-01.5 | Thêm sản phẩm mới (tên, giá, mô tả, ảnh, danh mục, tồn kho)       | Admin |
| FR-01.6 | Cập nhật thông tin sản phẩm                                       | Admin |
| FR-01.7 | Xóa sản phẩm                                                      | Admin |

### FR-02: Bài Viết / CMS (Post)

| ID      | Yêu cầu                                                      | Actor        |
| ------- | ------------------------------------------------------------ | ------------ |
| FR-02.1 | Xem danh sách bài viết mới nhất                              | Guest        |
| FR-02.2 | Lọc bài viết theo danh mục (Hướng dẫn, Review, Tin tức, Mẹo) | Guest        |
| FR-02.3 | Xem chi tiết bài viết (tiêu đề, nội dung, ảnh, ngày đăng)    | Guest        |
| FR-02.4 | Thêm bài viết mới (tiêu đề, nội dung, ảnh, danh mục)         | Admin/Editor |
| FR-02.5 | Cập nhật bài viết                                            | Admin/Editor |
| FR-02.6 | Xóa bài viết                                                 | Admin/Editor |
| FR-02.7 | Hiển thị 3 bài viết mới nhất trên Home Page                  | Guest        |

### FR-03: Danh Mục (Category)

| ID      | Yêu cầu                                  | Actor |
| ------- | ---------------------------------------- | ----- |
| FR-03.1 | CRUD Danh mục sản phẩm (CategoryProduct) | Admin |
| FR-03.2 | CRUD Danh mục bài viết (Category)        | Admin |

### FR-04: Xác Thực & Phân Quyền

| ID      | Yêu cầu                                                       | Actor  |
| ------- | ------------------------------------------------------------- | ------ |
| FR-04.1 | Đăng nhập bằng Username + Password                            | All    |
| FR-04.2 | Cookie Authentication (duy trì phiên đăng nhập)               | All    |
| FR-04.3 | Phân quyền: Admin (toàn quyền), Editor (bài viết), User (xem) | System |
| FR-04.4 | Chặn truy cập trang Admin khi chưa đăng nhập                  | System |
| FR-04.5 | Redirect về /Account/Login khi chưa xác thực                  | System |

### FR-05: Đơn Hàng (Order)

| ID      | Yêu cầu                      | Actor    |
| ------- | ---------------------------- | -------- |
| FR-05.1 | Tạo đơn hàng từ giỏ hàng     | Customer |
| FR-05.2 | Xem danh sách đơn hàng       | Admin    |
| FR-05.3 | Cập nhật trạng thái đơn hàng | Admin    |

---

## 4. Yêu Cầu Phi Chức Năng (Non-Functional)

| ID     | Yêu cầu          | Mô tả                                                    |
| ------ | ---------------- | -------------------------------------------------------- |
| NFR-01 | **Performance**  | Thời gian tải trang < 3 giây                             |
| NFR-02 | **Responsive**   | Giao diện tương thích Desktop + Mobile                   |
| NFR-03 | **Security**     | Mật khẩu hash, chống XSS, CSRF                           |
| NFR-04 | **Usability**    | Giao diện trực quan, dễ dùng cho cả admin lẫn khách      |
| NFR-05 | **Code Quality** | Code sạch, comment tiếng Việt, naming convention rõ ràng |

---

## 5. User Stories

### US-01: Khách tham quan xem sản phẩm

> _Là một game thủ, tôi muốn xem danh sách chuột gaming và lọc theo hãng để chọn được sản phẩm phù hợp._

**Acceptance Criteria:**

- [ ] Trang `/products` hiển thị grid sản phẩm
- [ ] Có sidebar filter danh mục (Chuột, Bàn phím, Tai nghe, Lót chuột)
- [ ] Click danh mục → reload danh sách sản phẩm thuộc danh mục đó
- [ ] Mỗi sản phẩm hiển thị: ảnh, tên, giá

### US-02: Game thủ đọc bài hướng dẫn

> _Là người mới chơi bàn phím cơ, tôi muốn đọc bài "Hướng dẫn custom bàn phím cơ cho người mới" để biết cách chọn switch, keycap._

**Acceptance Criteria:**

- [ ] Trang chủ hiển thị 3 bài viết mới nhất
- [ ] Trang blog hiển thị danh sách bài viết, filter theo danh mục
- [ ] Click vào bài viết → hiển thị nội dung chi tiết

### US-03: Admin quản lý sản phẩm

> _Là admin, tôi muốn thêm sản phẩm mới "Akko 3068B" vào danh mục "Bàn phím cơ" với giá 1.200.000đ._

**Acceptance Criteria:**

- [ ] Sau khi đăng nhập Admin, vào `/Product` thấy danh sách SP
- [ ] Nút "Create New" → form thêm sản phẩm
- [ ] Upload ảnh, nhập tên, giá, mô tả, chọn danh mục, tồn kho
- [ ] Submit → SP xuất hiện trong danh sách

### US-04: Editor viết bài blog

> _Là editor, tôi muốn viết bài "Top 5 chuột gaming dưới 1 triệu" để thu hút người đọc._

**Acceptance Criteria:**

- [ ] Đăng nhập Editor → vào `/Post` thấy danh sách bài viết
- [ ] Nút "Create New" → form thêm bài viết
- [ ] Nhập tiêu đề, nội dung (HTML), chọn danh mục, upload ảnh đại diện
- [ ] Submit → bài viết xuất hiện trên trang blog

---

## 6. Kiến Trúc (Tóm Tắt)

```
┌──────────────┐     REST API      ┌──────────────────┐     EF Core     ┌─────────┐
│  React SPA   │ ◄──────────────► │  ASP.NET Core 8.0 │ ◄────────────► │  MySQL  │
│  (Port 3000) │      JSON        │    (Port 5228)    │                │ (3306)  │
└──────────────┘                   └──────────────────┘                └─────────┘
                                          │
                                          │ MVC (Razor Views)
                                          ▼
                                   ┌──────────────────┐
                                   │  Admin Dashboard  │
                                   │  /Product, /Post  │
                                   │  /Category ...    │
                                   └──────────────────┘
```

> Xem chi tiết tại [`architecture.md`](./architecture.md)

---

## 7. Rủi Ro & Giả Định

| Rủi ro                       | Mức độ     | Giải pháp                                                       |
| ---------------------------- | ---------- | --------------------------------------------------------------- |
| Mất dữ liệu do lỗi migration | Thấp       | EF Core Migration có rollback                                   |
| Lỗi CORS khi dev local       | Thấp       | Đã cấu hình `AllowReactApp` policy                              |
| Bảo mật mật khẩu yếu         | Trung bình | Dùng ASP.NET Identity hash (hiện tại plain text → cần nâng cấp) |
| Hiệu năng khi nhiều sản phẩm | Thấp       | Phân trang (pagination) khi > 100 SP                            |

---

## 8. Phụ Lục

### 8.1 Môi Trường Phát Triển

| Thành phần | Yêu cầu                      |
| ---------- | ---------------------------- |
| OS         | Windows 10/11                |
| IDE        | Visual Studio 2022 / VS Code |
| .NET SDK   | 8.0                          |
| Node.js    | 18+                          |
| MySQL      | 8.0+                         |
| Git        | Quản lý source code          |

### 8.2 Tài Khoản Mẫu

| Username  | Password   | Role   |
| --------- | ---------- | ------ |
| `admin`   | `123456`   | Admin  |
| `thai_gv` | `thai1969` | Editor |
| `sv_01`   | `student1` | User   |

---

> **Trạng thái:** Đã review lần 1 — Sẵn sàng cho giai đoạn phát triển.
