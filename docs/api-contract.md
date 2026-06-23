# 🔌 API Contract — RESTful API Specification

> **Dự án:** Website Đồ Công Nghệ & Gaming Gear  
> **Base URL:** `http://localhost:5228/api`  
> **Định dạng:** JSON  
> **Auth:** Cookie (MVC) / Public (API GET)  
> **Sinh viên:** Phùng Đàm Duy Bảo — MSSV: 2123110487

---

## 1. Quy Ước Chung

| Mục             | Quy định                                                                              |
| --------------- | ------------------------------------------------------------------------------------- |
| **Base URL**    | `http://localhost:5228/api`                                                           |
| **Định dạng**   | `application/json`                                                                    |
| **Encoding**    | UTF-8                                                                                 |
| **HTTP Status** | 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 500 Server Error |
| **Endpoint**    | `/api/{controller}` — tự động theo tên controller                                     |
| **Auth**        | Cookie Authentication cho Admin; Public cho GET sản phẩm và bài viết                  |

### 1.1 Cấu Trúc Response Chuẩn

```json
// ✅ Thành công (danh sách):
[
  { "id": 1, "name": "Chuột Logitech G502", "price": 890000 },
  { "id": 2, "name": "Bàn phím Akko 3068B", "price": 1200000 }
]

// ✅ Thành công (đơn):
{ "id": 1, "name": "Chuột Logitech G502", "price": 890000 }

// ❌ Lỗi:
{ "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1", "title": "Bad Request", "status": 400 }
```

---

## 2. API: Sản Phẩm (Products)

> **Controller:** `ProductsController` — `[Route("api/[controller]")]`  
> **Auth:** GET public, POST/PUT/DELETE cần Admin

---

### 2.1 GET — Lấy tất cả sản phẩm

```
GET /api/products
```

**Response `200 OK`:**

```json
[
  {
    "id": 1,
    "name": "Logitech G Pro X Superlight",
    "description": "Chuột gaming không dây siêu nhẹ 63g, cảm biến HERO 25K.",
    "price": 3290000.0,
    "discountPercentage": 12.0,
    "rating": 4.8,
    "stockQuantity": 25,
    "imageUrl": "https://resource.logitechg.com/.../thumbnail.webp",
    "images": "[\".../1.webp\",\".../2.webp\",\".../3.webp\"]",
    "brand": "Logitech",
    "sku": "LOG-GPX-001",
    "categoryProductId": 1,
    "categoryProduct": {
      "id": 1,
      "name": "Chuột Gaming",
      "description": "Chuột chuyên dụng cho game thủ"
    },
    "reviews": [
      {
        "id": 1,
        "productId": 1,
        "rating": 5,
        "comment": "Chuột quá nhẹ, cảm giác cầm cực tốt!",
        "reviewerName": "GamerPro99",
        "createdDate": "2026-06-15T00:00:00"
      }
    ]
  }
]
```

| Status | Ý nghĩa                       |
| ------ | ----------------------------- |
| `200`  | Thành công — Trả về danh sách |
| `500`  | Lỗi server                    |

---

### 2.2 GET — Lấy chi tiết sản phẩm

```
GET /api/products/{id}
```

**Response `200 OK`:**

```json
{
  "id": 1,
  "name": "Logitech G Pro X Superlight",
  "description": "Chuột gaming không dây siêu nhẹ 63g, cảm biến HERO 25K.",
  "price": 3290000.0,
  "discountPercentage": 12.0,
  "rating": 4.8,
  "stockQuantity": 25,
  "imageUrl": "https://resource.logitechg.com/.../thumbnail.webp",
  "images": "[\".../1.webp\",\".../2.webp\"]",
  "brand": "Logitech",
  "sku": "LOG-GPX-001",
  "categoryProductId": 1,
  "categoryProduct": { "id": 1, "name": "Chuột Gaming" },
  "reviews": [
    {
      "id": 1,
      "rating": 5,
      "comment": "Tuyệt vời!",
      "reviewerName": "GamerPro99"
    }
  ]
}
```

| Status | Ý nghĩa                 |
| ------ | ----------------------- |
| `200`  | Thành công              |
| `404`  | Không tìm thấy sản phẩm |

---

### 2.3 POST — Tạo sản phẩm mới 🔒

```
POST /api/products
```

**Request Body:**

```json
{
  "name": "Akko 3068B Plus",
  "description": "Bàn phím cơ 65%, switch Akko CS Jelly Pink, hotswap",
  "price": 1200000.0,
  "discountPercentage": 0,
  "stockQuantity": 20,
  "imageUrl": "/uploads/akko-3068b.jpg",
  "images": "[\".../1.webp\"]",
  "brand": "Akko",
  "sku": "AKK-3068B-001",
  "categoryProductId": 2
}
```

**Response `201 Created`:**

```json
{
  "id": 6,
  "name": "Akko 3068B Plus",
  "price": 1200000.0,
  "categoryProductId": 2
}
```

| Status | Ý nghĩa              |
| ------ | -------------------- |
| `201`  | Tạo thành công       |
| `400`  | Dữ liệu không hợp lệ |
| `401`  | Chưa đăng nhập       |

---

### 2.4 PUT — Cập nhật sản phẩm 🔒

```
PUT /api/products/{id}
```

**Request Body:**

```json
{
  "id": 1,
  "name": "Chuột Logitech G502 X PLUS",
  "description": "Phiên bản nâng cấp với cảm biến HERO 25K",
  "price": 1290000.0,
  "discountPercentage": 5,
  "stockQuantity": 10,
  "imageUrl": "/uploads/g502x-plus.jpg",
  "images": "[\".../1.webp\",\".../2.webp\"]",
  "brand": "Logitech",
  "sku": "LOG-G502X-002",
  "categoryProductId": 1
}
```

**Response `204 No Content`**

| Status | Ý nghĩa                        |
| ------ | ------------------------------ |
| `204`  | Cập nhật thành công            |
| `400`  | ID không khớp hoặc dữ liệu lỗi |
| `404`  | Không tìm thấy sản phẩm        |

---

### 2.5 DELETE — Xóa sản phẩm 🔒

```
DELETE /api/products/{id}
```

**Response `204 No Content`**

| Status | Ý nghĩa                 |
| ------ | ----------------------- |
| `204`  | Xóa thành công          |
| `404`  | Không tìm thấy sản phẩm |

---

## 3. API: Bài Viết / Blog (Posts)

> **Controller:** `PostsController` — `[Route("api/[controller]")]`  
> **Auth:** GET public, POST/PUT/DELETE cần Admin/Editor

---

### 3.1 GET — Lấy tất cả bài viết

```
GET /api/posts
```

**Response `200 OK`:**

```json
[
  {
    "id": 1,
    "title": "Hướng dẫn custom bàn phím cơ cho người mới",
    "content": "<h2>Bắt đầu từ đâu?</h2><p>Nếu bạn mới...</p>",
    "imageUrl": "/uploads/custom-keyboard.jpg",
    "createdDate": "2026-06-15T10:30:00",
    "categoryId": 1,
    "category": {
      "id": 1,
      "name": "🛠️ Hướng Dẫn Custom"
    }
  }
]
```

**Query Parameters (tùy chọn):**
| Param | Kiểu | Mô tả |
|-------|------|-------|
| `categoryId` | int | Lọc theo danh mục bài viết |

```
GET /api/posts?categoryId=2   // Chỉ lấy bài viết thuộc "Top List & Review"
```

---

### 3.2 GET — Lấy chi tiết bài viết

```
GET /api/posts/{id}
```

**Response `200 OK`:**

```json
{
  "id": 1,
  "title": "Hướng dẫn custom bàn phím cơ cho người mới",
  "content": "<h2>1. Chọn form factor</h2><p>Full-size, TKL, 65%, 60%...</p><h2>2. Chọn switch</h2><p>Linear, Tactile, Clicky...</p>",
  "imageUrl": "/uploads/custom-keyboard.jpg",
  "createdDate": "2026-06-15T10:30:00",
  "categoryId": 1,
  "category": { "id": 1, "name": "🛠️ Hướng Dẫn Custom" }
}
```

---

### 3.3 POST — Tạo bài viết mới 🔒

```
POST /api/posts
```

**Request Body:**

```json
{
  "title": "Top 5 chuột gaming dưới 1 triệu đáng mua nhất 2026",
  "content": "<h2>1. Logitech G102</h2><p>Giá: 450.000đ...</p><h2>2. Razer Viper Mini</h2><p>...</p>",
  "imageUrl": "/uploads/top5-mouse.jpg",
  "categoryId": 2
}
```

| Status | Ý nghĩa                      |
| ------ | ---------------------------- |
| `201`  | Tạo thành công               |
| `400`  | Dữ liệu lỗi                  |
| `401`  | Chưa đăng nhập               |
| `403`  | Không có quyền (User thường) |

---

### 3.4 PUT — Cập nhật bài viết 🔒

```
PUT /api/posts/{id}
```

**Request Body:** (tương tự POST, có thêm `id`)

**Response `204 No Content`**

---

### 3.5 DELETE — Xóa bài viết 🔒

```
DELETE /api/posts/{id}
```

**Response `204 No Content`**

---

## 4. API: Danh Mục Sản Phẩm (CategoriesProducts)

> **Controller:** `CategoriesProductsController` — `[Route("api/[controller]")]`  
> **Auth:** GET public

---

### 4.1 GET — Lấy tất cả danh mục sản phẩm

```
GET /api/categoriesproducts
```

**Response `200 OK`:**

```json
[
  {
    "id": 1,
    "name": "🖱️ Chuột Gaming",
    "description": "Chuột chơi game chuyên dụng, cảm biến cao cấp"
  },
  {
    "id": 2,
    "name": "⌨️ Bàn Phím Cơ",
    "description": "Bàn phím cơ switch hotswap, custom keycap"
  },
  {
    "id": 3,
    "name": "🎧 Tai Nghe Gaming",
    "description": "Tai nghe 7.1 surround, noise-cancelling"
  },
  {
    "id": 4,
    "name": "🪫 Lót Chuột LED",
    "description": "Mousepad RGB kích thước lớn, chống trượt"
  }
]
```

---

## 5. API: Danh Mục Bài Viết (Categories)

```
GET /api/categories
```

**Response `200 OK`:**

```json
[
  {
    "id": 1,
    "name": "🛠️ Hướng Dẫn Custom",
    "description": "Hướng dẫn mod, build bàn phím cơ, thay switch"
  },
  {
    "id": 2,
    "name": "🏆 Top List & Review",
    "description": "Bảng xếp hạng, đánh giá sản phẩm gaming"
  },
  {
    "id": 3,
    "name": "📰 Tin Công Nghệ",
    "description": "Tin tức mới nhất về gaming gear"
  },
  {
    "id": 4,
    "name": "💡 Mẹo & Thủ Thuật",
    "description": "Mẹo tối ưu setup gaming, bảo trì thiết bị"
  }
]
```

---

## 6. Frontend Service Layer (Cách Gọi API)

### 6.1 Cấu Hình Axios Client

```javascript
// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5228/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

axiosClient.interceptors.response.use(
  (response) => response.data, // Bóc tách thẳng .data
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  },
);

export default axiosClient;
```

### 6.2 Service Mẫu

```javascript
// src/services/productService.js
import axiosClient from "../api/axiosClient";

const productService = {
  getAll: () => axiosClient.get("/products"),
  getById: (id) => axiosClient.get(`/products/${id}`),
  create: (data) => axiosClient.post("/products", data),
  update: (id, data) => axiosClient.put(`/products/${id}`, data),
  delete: (id) => axiosClient.delete(`/products/${id}`),
};

export default productService;
```

```javascript
// src/services/blogService.js
import axiosClient from "../api/axiosClient";

const blogService = {
  getAllPosts: () => axiosClient.get("/posts"),
  getPostById: (id) => axiosClient.get(`/posts/${id}`),
  getCategories: () => axiosClient.get("/categories"),
};

export default blogService;
```

---

## 7. Bảng Tổng Hợp API

| Method   | Endpoint                  | Auth | Controller                   | Mô tả              |
| -------- | ------------------------- | :--: | ---------------------------- | ------------------ |
| `GET`    | `/api/products`           |  ❌  | ProductsController           | Danh sách sản phẩm |
| `GET`    | `/api/products/{id}`      |  ❌  | ProductsController           | Chi tiết sản phẩm  |
| `POST`   | `/api/products`           |  🔒  | ProductsController           | Tạo sản phẩm       |
| `PUT`    | `/api/products/{id}`      |  🔒  | ProductsController           | Cập nhật SP        |
| `DELETE` | `/api/products/{id}`      |  🔒  | ProductsController           | Xóa sản phẩm       |
| `GET`    | `/api/posts`              |  ❌  | PostsController              | Danh sách bài viết |
| `GET`    | `/api/posts/{id}`         |  ❌  | PostsController              | Chi tiết bài viết  |
| `POST`   | `/api/posts`              |  🔒  | PostsController              | Tạo bài viết       |
| `PUT`    | `/api/posts/{id}`         |  🔒  | PostsController              | Cập nhật bài       |
| `DELETE` | `/api/posts/{id}`         |  🔒  | PostsController              | Xóa bài viết       |
| `GET`    | `/api/categoriesproducts` |  ❌  | CategoriesProductsController | Danh mục SP        |
| `GET`    | `/api/categories`         |  ❌  | (cần thêm)                   | Danh mục bài viết  |

---

## 8. Error Handling

### 8.1 Các Mã Lỗi Thường Gặp

| HTTP Status                 | Ý nghĩa                      | Cách xử lý                              |
| --------------------------- | ---------------------------- | --------------------------------------- |
| `400 Bad Request`           | Dữ liệu gửi lên không hợp lệ | Kiểm tra lại JSON body                  |
| `401 Unauthorized`          | Chưa đăng nhập               | Redirect → `/Account/Login`             |
| `403 Forbidden`             | Không có quyền               | Hiển thị thông báo "Bạn không có quyền" |
| `404 Not Found`             | Không tìm thấy resource      | Hiển thị "Không tìm thấy"               |
| `500 Internal Server Error` | Lỗi server                   | Log lỗi, hiển thị "Đã có lỗi xảy ra"    |

### 8.2 CORS

```csharp
// Program.cs — Chỉ cho phép React Dev Server gọi API
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReactApp", policy => {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});
```

---

> **Trạng thái:** Hoàn thiện — Dùng làm tài liệu tham khảo cho Frontend & Backend developer.
