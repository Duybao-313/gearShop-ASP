import React from "react";

const BlogFilterBar = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="d-flex flex-wrap align-items-center gap-2 mb-4 pb-4 border-bottom">
      {/* Nút Tất cả */}
      <button
        className={`btn btn-sm text-uppercase font-weight-bold ${
          activeCategory === null
            ? "btn-dark text-white"
            : "btn-outline-dark"
        }`}
        style={{ letterSpacing: "1px", fontSize: "11px", padding: "8px 20px" }}
        onClick={() => onCategoryChange(null)}
      >
        TẤT CẢ
      </button>

      {/* Danh sách category */}
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`btn btn-sm text-uppercase ${
            activeCategory === cat.id
              ? "btn-dark text-white font-weight-bold"
              : "btn-outline-dark"
          }`}
          style={{ letterSpacing: "1px", fontSize: "11px", padding: "8px 20px" }}
          onClick={() => onCategoryChange(cat.id)}
        >
          {cat.name}
        </button>
      ))}

      {/* Số lượng kết quả */}
      <span
        className="ml-auto text-muted"
        style={{ fontSize: "13px" }}
      >
        {/* Sẽ được hiển thị từ parent */}
      </span>
    </div>
  );
};

export default BlogFilterBar;
