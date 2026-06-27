import React from "react";
import { Link } from "react-router-dom";

/**
 * BlogDetailSidebar — Sidebar trong trang chi tiết bài viết
 * Hiển thị danh mục blog, bài viết liên quan, và thông tin tác giả
 */
const BlogDetailSidebar = ({ post, categories, relatedPosts }) => {
  return (
    <div className="col-12 mt-4 mt-lg-0">
      <div style={{ position: "sticky", top: "100px" }}>
        {/* ===== DANH MỤC BÀI VIẾT ===== */}
        {categories && categories.length > 0 && (
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-bottom py-3 px-4">
              <h5
                className="card-title text-uppercase font-weight-bold text-dark d-flex align-items-center mb-0"
                style={{ letterSpacing: "0.5px", fontSize: "14px" }}
              >
                <i className="fa-solid fa-layer-group text-dark mr-2"></i>
                Danh Mục Bài Viết
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/blog?category=${cat.id}`}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center px-4 py-3 ${
                      post?.categoryId === cat.id ? "active bg-dark border-dark" : ""
                    }`}
                    style={{ fontSize: "14px" }}
                  >
                    <span className="font-weight-medium">{cat.name}</span>
                    <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px" }}></i>
                  </Link>
                ))}
                <Link
                  to="/blog"
                  className="list-group-item list-group-item-action px-4 py-3 text-muted"
                  style={{ fontSize: "13px" }}
                >
                  <i className="fa-solid fa-arrow-left mr-2"></i>Xem tất cả bài viết
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ===== BÀI VIẾT LIÊN QUAN ===== */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-bottom py-3 px-4">
              <h5
                className="card-title text-uppercase font-weight-bold text-dark d-flex align-items-center mb-0"
                style={{ letterSpacing: "0.5px", fontSize: "14px" }}
              >
                <i className="fa-solid fa-newspaper text-dark mr-2"></i>
                Bài Viết Liên Quan
              </h5>
            </div>
            <div className="card-body p-0">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.id}`}
                  className="d-flex p-3 text-decoration-none border-bottom hover-bg-light"
                  style={{ transition: "background 0.2s" }}
                >
                  {/* Ảnh thumbnail */}
                  <div
                    className="mr-3 flex-shrink-0 overflow-hidden"
                    style={{ width: "70px", height: "55px", backgroundColor: "#1a1a1a" }}
                  >
                    <img
                      src={
                        rp.imageUrl ||
                        "https://placehold.co/140x110/1a1a1a/666?text=BLOG"
                      }
                      alt={rp.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                  </div>
                  {/* Tiêu đề + ngày */}
                  <div className="d-flex flex-column justify-content-center" style={{ minWidth: 0 }}>
                    <h6
                      className="mb-1 text-dark font-weight-bold"
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {rp.title}
                    </h6>
                    <small className="text-muted text-uppercase" style={{ fontSize: "10px", letterSpacing: "1px" }}>
                      {new Date(rp.createdDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </small>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ===== VỀ TÁC GIẢ ===== */}
        <div className="card border-0 shadow-sm bg-dark text-white">
          <div className="card-body p-4 text-center">
            <div
              className="d-flex align-items-center justify-content-center mx-auto mb-3 bg-white"
              style={{ width: "60px", height: "60px" }}
            >
              <span className="text-dark text-uppercase font-weight-bold" style={{ fontSize: "18px", letterSpacing: "1px" }}>
                DB
              </span>
            </div>
            <h6 className="font-weight-bold text-uppercase mb-1" style={{ letterSpacing: "1px", fontSize: "13px" }}>
              Duy Bảo
            </h6>
            <p className="text-white-50 mb-3" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
              Đam mê công nghệ & gaming gear. Chia sẻ kiến thức về bàn phím cơ, chuột gaming và phụ kiện.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="text-white-50 hover-text-white">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="text-white-50 hover-text-white">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="#" className="text-white-50 hover-text-white">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSidebar;
