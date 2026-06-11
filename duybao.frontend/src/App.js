import React from "react";
import CategoryProductList from "./components/CategoryProductList";
import PostList from "./components/PostList";
import BlogCategoryList from "./components/BlogCategoryList"; // 1. Import Component bài tập tự làm vào đây
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
        {/* CỘT TRÁI: CHỨA CÁC BỘ LỌC PHÂN LOẠI DỮ LIỆU */}
        <div className="col-md-3">
          {/* Phân loại phục vụ thương mại điện tử (Đã làm ở buổi trước) */}
          <CategoryProductList />

          {/* BÀI TẬP TỰ LÀM: Phân loại phục vụ quản trị nội dung tin tức blog */}
          <BlogCategoryList />
        </div>

        {/* CỘT PHẢI: CHỨA NỘI DUNG CHI TIẾT HIỂN THỊ CHÍNH */}
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
