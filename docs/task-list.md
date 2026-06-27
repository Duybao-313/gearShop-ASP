# ✅ Task List — Website Đồ Công Nghệ & Gaming Gear

> **Dự án:** ASP.NET Website Đồ Công Nghệ & Gaming Gear  
> **Sinh viên:** Phùng Đàm Duy Bảo — MSSV: 2123110487  
> **Ngày:** 28/06/2026

---

## 📊 Tổng Quan Tiến Độ

| Giai đoạn | Tên                  | Số Task | Trạng thái |
| --------- | -------------------- | :-----: | :--------: |
| Phase 1   | Database & Seed Data |    4    |  ✅ Done   |
| Phase 2   | Backend Core         |    8    |  ✅ Done   |
| Phase 3   | Frontend React       |   10    |  ✅ Done   |
| Phase 4   | CMS / Blog           |    5    |  ✅ Done   |
| Phase 5   | Order & Customer     |    4    |  ✅ Done   |
| Phase 6   | Polish & Deploy      |    4    |  ✅ Done   |
| **Tổng**  |                      | **35**  |            |

---

## Phase 1: Database & Seed Data

> 🎯 **Mục tiêu:** Thiết lập database schema và dữ liệu mẫu gaming gear.

| ID        | Task                                                                                                                                                            | Status |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: |
| **T-001** | Tạo Entity `Product` đầy đủ fields: Name, Description, Price, DiscountPercentage, Rating, StockQuantity, ImageUrl, Images (JSON), Brand, Sku, CategoryProductId |   ✅   |
| **T-002** | Tạo Entity `Post` với fields: Title, Content, ImageUrl, CreatedDate, CategoryId                                                                                 |   ✅   |
| **T-003** | Seed Data Gaming Gear (12 SP) + Import DummyJSON (38 SP công nghệ)                                                                                              |   ✅   |
| **T-004** | Tạo Entity `Category` API Controller `[Route("api/[controller]")]`                                                                                              |   ✅   |

---

## Phase 2: Backend Core

> 🎯 **Mục tiêu:** Hoàn thiện API và MVC Admin.

| ID        | Task                                                                       | Status |
| --------- | -------------------------------------------------------------------------- | :----: |
| **T-005** | Hoàn thiện `ProductsController` API: GET all, GET by id, POST, PUT, DELETE |   ✅   |
| **T-006** | Hoàn thiện `PostsController` API: GET all, GET by id, POST, PUT, DELETE    |   ✅   |
| **T-007** | Thêm query param `?categoryId=` cho GET `/api/posts` và `/api/products`    |   ✅   |
| **T-008** | Tạo `CategoriesController` API `[Route("api/[controller]")]`               |   ✅   |
| **T-009** | Validate dữ liệu đầu vào cho POST/PUT (ModelState.IsValid)                 |   ✅   |
| **T-010** | Thêm chức năng upload ảnh sản phẩm & bài viết                              |   ✅   |
| **T-011** | Thêm pagination cho GET `/api/products` (pageSize=12)                      |   ✅   |
| **T-012** | Thêm Search API: `GET /api/products/search?q=chuột`                        |   ✅   |

---

## Phase 3: Frontend React SPA

> 🎯 **Mục tiêu:** Giao diện người dùng hoàn chỉnh.

| ID        | Task                                                            | Status |
| --------- | --------------------------------------------------------------- | :----: |
| **T-013** | Fix `axiosClient` baseURL đúng port backend                     |   ✅   |
| **T-014** | Trang `HomePage`: Banner + Featured Products + Latest Posts     |   ✅   |
| **T-015** | Trang `ProductsPage`: Grid sản phẩm + Filter danh mục (sidebar) |   ✅   |
| **T-016** | Component `ProductCard`: Hiển thị ảnh, tên, giá, danh mục       |   ✅   |
| **T-017** | Trang `ProductDetailPage`: Chi tiết sản phẩm, ảnh lớn, mô tả    |   ✅   |
| **T-018** | Trang `BlogPage`: Danh sách bài viết + Filter danh mục          |   ✅   |
| **T-019** | Trang `BlogDetailPage`: Nội dung bài viết đầy đủ                |   ✅   |
| **T-020** | Component `SearchBar`: Tìm kiếm sản phẩm                        |   ✅   |
| **T-021** | Responsive CSS cho Mobile                                       |   ✅   |
| **T-022** | Loading Skeleton / Spinner khi gọi API                          |   ✅   |

---

## Phase 4: CMS / Blog Platform

> 🎯 **Mục tiêu:** Hệ thống quản trị nội dung bài viết.

| ID        | Task                                                    | Status |
| --------- | ------------------------------------------------------- | :----: |
| **T-023** | Trang Admin Post: Hiển thị danh sách bài viết dạng bảng |   ✅   |
| **T-024** | Form Create/Edit Post với CKEditor Rich Text            |   ✅   |
| **T-025** | Trang Admin Category: CRUD danh mục bài viết            |   ✅   |
| **T-026** | Cập nhật nội dung bài viết mẫu về gaming gear           |   ✅   |
| **T-027** | CKEditor upload & chèn hình ảnh vào nội dung bài viết   |   ✅   |

---

## Phase 5: Order & Customer

> 🎯 **Mục tiêu:** Hoàn thiện luồng đặt hàng.

| ID        | Task                                                             | Status |
| --------- | ---------------------------------------------------------------- | :----: |
| **T-028** | Tạo `OrdersController` API: GET all, GET by id, POST, PUT status |   ✅   |
| **T-029** | Tạo form Checkout (Frontend): Nhập thông tin KH + Giỏ hàng       |   ✅   |
| **T-030** | Trang Admin Orders: Xem danh sách đơn, cập nhật trạng thái       |   ✅   |
| **T-031** | Validate tồn kho khi đặt hàng (giảm StockQuantity)               |   ✅   |

---

## Phase 6: Polish & Deploy

> 🎯 **Mục tiêu:** Hoàn thiện, tối ưu và triển khai.

| ID        | Task                                                           | Status |
| --------- | -------------------------------------------------------------- | :----: |
| **T-032** | Đổi theme giao diện: Màu tối gaming (dark theme) + font gaming |   ✅   |
| **T-033** | Hash password user (BCrypt)                                    |   ✅   |
| **T-034** | SEO cơ bản: Meta tags, title cho từng trang                    |   ✅   |
| **T-035** | Viết README.md hướng dẫn cài đặt & chạy dự án                  |   ✅   |

---

> **Trạng thái cuối:** ✅ HOÀN THÀNH — 35/35 task  
> **Ngày hoàn thành:** 28/06/2026  
> **Sinh viên thực hiện: Phùng Đàm Duy Bảo — MSSV: 2123110487**
