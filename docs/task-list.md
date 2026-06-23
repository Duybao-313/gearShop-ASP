# ✅ Task List — Website Đồ Công Nghệ & Gaming Gear

> **Dự án:** ASP.NET Website Đồ Công Nghệ & Gaming Gear  
> **Sinh viên:** Phùng Đàm Duy Bảo — MSSV: 2123110487  
> **Ngày:** 24/06/2026 — Cập nhật: Entity v3, DummyJSON 38 SP, Seed Data Gaming Gear 12 SP

---

## 📊 Tổng Quan Tiến Độ

| Giai đoạn | Tên                  | Số Task |   Trạng thái   |
| --------- | -------------------- | :-----: | :------------: |
| Phase 1   | Database & Seed Data |    4    |    ✅ Done     |
| Phase 2   | Backend Core         |    8    | 🔄 In Progress |
| Phase 3   | Frontend React       |   10    | 🔄 In Progress |
| Phase 4   | CMS / Blog           |    5    |    ⬜ Todo     |
| Phase 5   | Order & Customer     |    4    |    ⬜ Todo     |
| Phase 6   | Polish & Deploy      |    4    |    ⬜ Todo     |
| **Tổng**  |                      | **35**  |                |

---

## Phase 1: Database & Seed Data

> 🎯 **Mục tiêu:** Thiết lập database schema và dữ liệu mẫu gaming gear.

| ID        | Task                                                                                                                                                                | Priority | Status  | Ghi chú                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: | :-----: | ----------------------------------- |
| **T-001** | Tạo Entity `Product` với đầy đủ fields: Name, Description, Price, DiscountPercentage, Rating, StockQuantity, ImageUrl, Images (JSON), Brand, Sku, CategoryProductId |    P0    | ✅ Done | Entity v3 + Review entity           |
| **T-002** | Tạo Entity `Post` với fields: Title, Content, ImageUrl, CreatedDate, CategoryId                                                                                     |    P0    | ✅ Done | Đã có sẵn                           |
| **T-003** | Đổi Seed Data từ thời trang → Gaming Gear (12 SP) + Import DummyJSON (38 SP công nghệ)                                                                              |    P0    | ✅ Done | File SQL: docs/import-dummyjson.sql |
| **T-004** | Tạo Entity `Category` API Controller `[Route("api/[controller]")]`                                                                                                  |    P1    | ⬜ Todo | Frontend cần gọi API này            |

---

## Phase 2: Backend Core

> 🎯 **Mục tiêu:** Hoàn thiện API và MVC Admin.

| ID        | Task                                                                        | Priority | Status  | Ghi chú                    |
| --------- | --------------------------------------------------------------------------- | :------: | :-----: | -------------------------- |
| **T-005** | Hoàn thiện `ProductsController` API: GET all, GET by id, POST, PUT, DELETE  |    P0    | ✅ Done | Đã có CRUD cơ bản          |
| **T-006** | Hoàn thiện `PostsController` API: GET all, GET by id, POST, PUT, DELETE     |    P0    | ✅ Done | Đã có GET all              |
| **T-007** | Thêm query param `?categoryId=` cho GET `/api/posts` và GET `/api/products` |    P1    | ⬜ Todo | Lọc theo danh mục          |
| **T-008** | Tạo `CategoriesController` API `[Route("api/[controller]")]`                |    P1    | ⬜ Todo | API danh mục bài viết      |
| **T-009** | Validate dữ liệu đầu vào cho POST/PUT (ModelState.IsValid)                  |    P1    | ⬜ Todo | Trả về lỗi chi tiết        |
| **T-010** | Thêm chức năng upload ảnh sản phẩm & bài viết                               |    P1    | ⬜ Todo | Lưu vào `wwwroot/uploads/` |
| **T-011** | Thêm pagination cho GET `/api/products` (pageSize=12)                       |    P2    | ⬜ Todo | Khi > 50 sản phẩm          |
| **T-012** | Thêm Search API: `GET /api/products/search?q=chuột`                         |    P2    | ⬜ Todo | Tìm kiếm theo tên          |

---

## Phase 3: Frontend React SPA

> 🎯 **Mục tiêu:** Giao diện người dùng hoàn chỉnh.

| ID        | Task                                                            | Priority | Status  | Ghi chú               |
| --------- | --------------------------------------------------------------- | :------: | :-----: | --------------------- |
| **T-013** | Fix `axiosClient` baseURL đúng port backend                     |    P0    | ✅ Done | `localhost:5228/api`  |
| **T-014** | Trang `HomePage`: Banner + Featured Products + Latest Posts     |    P0    | ✅ Done | Có sẵn                |
| **T-015** | Trang `ProductsPage`: Grid sản phẩm + Filter danh mục (sidebar) |    P0    | ✅ Done | Cần đổi theme gaming  |
| **T-016** | Component `ProductCard`: Hiển thị ảnh, tên, giá, danh mục       |    P0    | ⬜ Todo | Style gaming gear     |
| **T-017** | Trang `ProductDetailPage`: Chi tiết sản phẩm, ảnh lớn, mô tả    |    P0    | ⬜ Todo | Route `/products/:id` |
| **T-018** | Trang `BlogPage`: Danh sách bài viết + Filter danh mục          |    P0    | ⬜ Todo | Route `/blog`         |
| **T-019** | Trang `BlogDetailPage`: Nội dung bài viết đầy đủ                |    P1    | ⬜ Todo | Route `/blog/:id`     |
| **T-020** | Component `SearchBar`: Tìm kiếm sản phẩm                        |    P1    | ⬜ Todo | Trong NavBar          |
| **T-021** | Responsive CSS cho Mobile                                       |    P1    | ⬜ Todo | Dùng media queries    |
| **T-022** | Loading Skeleton / Spinner khi gọi API                          |    P2    | ⬜ Todo | UX tốt hơn            |

---

## Phase 4: CMS / Blog Platform

> 🎯 **Mục tiêu:** Hệ thống quản trị nội dung bài viết.

| ID        | Task                                                      | Priority | Status  | Ghi chú               |
| --------- | --------------------------------------------------------- | :------: | :-----: | --------------------- |
| **T-023** | Trang Admin Post: Hiển thị danh sách bài viết dạng bảng   |    P0    | ✅ Done | MVC View đã có        |
| **T-024** | Form Create/Edit Post với Editor nội dung (textarea/HTML) |    P0    | ✅ Done | MVC View đã có        |
| **T-025** | Trang Admin Category: CRUD danh mục bài viết              |    P1    | ✅ Done | MVC View đã có        |
| **T-026** | Cập nhật nội dung bài viết mẫu về gaming gear             |    P1    | ⬜ Todo | Viết nội dung thực tế |
| **T-027** | Thêm chức năng upload ảnh thumbnail cho bài viết          |    P1    | ⬜ Todo | `wwwroot/uploads/`    |

---

## Phase 5: Order & Customer

> 🎯 **Mục tiêu:** Hoàn thiện luồng đặt hàng.

| ID        | Task                                                             | Priority | Status  | Ghi chú                |
| --------- | ---------------------------------------------------------------- | :------: | :-----: | ---------------------- |
| **T-028** | Tạo `OrdersController` API: GET all, GET by id, POST, PUT status |    P0    | ⬜ Todo | CRUD đơn hàng          |
| **T-029** | Tạo form Checkout (Frontend): Nhập thông tin khách + Giỏ hàng    |    P0    | ⬜ Todo | React component        |
| **T-030** | Trang Admin Orders: Xem danh sách đơn, cập nhật trạng thái       |    P1    | ⬜ Todo | MVC View               |
| **T-031** | Validate tồn kho khi đặt hàng (giảm StockQuantity)               |    P1    | ⬜ Todo | Tránh bán quá số lượng |

---

## Phase 6: Polish & Deploy

> 🎯 **Mục tiêu:** Hoàn thiện, tối ưu và triển khai.

| ID        | Task                                                           | Priority | Status  | Ghi chú        |
| --------- | -------------------------------------------------------------- | :------: | :-----: | -------------- |
| **T-032** | Đổi theme giao diện: Màu tối gaming (dark theme) + font gaming |    P1    | ⬜ Todo | CSS toàn trang |
| **T-033** | Hash password user (BCrypt hoặc ASP.NET Identity)              |    P1    | ⬜ Todo | Bảo mật        |
| **T-034** | SEO cơ bản: Meta tags, title cho từng trang                    |    P2    | ⬜ Todo |                |
| **T-035** | Viết README.md hướng dẫn cài đặt & chạy dự án                  |    P2    | ⬜ Todo |                |

---

## 🔥 Ưu Tiên Hiện Tại (Sprint Focus)

```
P0 - LÀM NGAY:
├── T-003: Đổi Seed Data → Gaming Gear
├── T-016: ProductCard component gaming style
├── T-017: ProductDetailPage
├── T-018: BlogPage
└── T-028: OrdersController API

P1 - LÀM SAU:
├── T-004: Categories API Controller
├── T-007: Filter theo categoryId
├── T-008: API Category
├── T-019: BlogDetailPage
├── T-021: Responsive Mobile
├── T-026: Viết nội dung blog gaming gear
├── T-027: Upload ảnh thumbnail
├── T-029: Checkout form
└── T-033: Hash password

P2 - LÀM CUỐI:
├── T-011: Pagination
├── T-012: Search API
├── T-022: Loading skeleton
├── T-034: SEO
└── T-035: README
```

---

## 📝 Ghi Chú

- Mỗi task nên có commit riêng với message rõ ràng
- Pull code mới nhất trước khi bắt đầu task mới
- Test trên localhost trước khi push
- Báo cáo blocker ngay khi gặp

---

> **Trạng thái:** Đang cập nhật — Review hàng tuần.
