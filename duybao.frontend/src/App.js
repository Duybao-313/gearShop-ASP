import React from "react";
import CategoryProductList from "./components/CategoryProductList";
import PostList from "./components/PostList";
import "./App.css";

function App() {
  return (
    <div className="container mt-5">
      <header className="text-center pb-3 mb-4 border-bottom">
        <span className="fs-4 font-weight-bold text-dark text-uppercase">
          👗 Fashion Boutique - Hệ Thống Quản Trị Nội Dung & Bán Hàng
        </span>
        <br />
        <small className="text-muted">
          Học Phần Chuyên Đề ASP.NET + ReactJS
        </small>
      </header>

      <div className="row">
        {/* Cột trái: Bộ lọc Phân loại sản phẩm thời trang (Đã làm ở buổi trước) */}
        <div className="col-md-3">
          <CategoryProductList />
        </div>

        {/* Cột phải: Danh sách bài viết tin tức lấy Real-time từ Database bằng useEffect */}
        <div className="col-md-9">
          <PostList />
        </div>
      </div>

      <footer className="text-center mt-5 pt-3 border-top text-muted">
        <small>
          © 2026 - Đồ án thực hành phân tầng ASP.NET Core Web API kết hợp
          ReactJS Client-side
        </small>
      </footer>
    </div>
  );
}

export default App;
