import React from "react";
import { Link } from "react-router-dom";

/**
 * BlogDetailHero — Phần đầu bài viết: breadcrumb, tiêu đề, tác giả, metadata
 */
const BlogDetailHero = ({ post }) => {
  if (!post) return null;

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="col-12 mb-4 pb-4 border-bottom">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol
          className="breadcrumb bg-transparent p-0 mb-2"
          style={{ fontSize: "11px", letterSpacing: "1px" }}
        >
          <li className="breadcrumb-item">
            <Link to="/" className="text-muted text-uppercase">
              TRANG CHỦ
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/blog" className="text-muted text-uppercase">
              BLOG
            </Link>
          </li>
          {post.category && (
            <li className="breadcrumb-item text-uppercase text-dark font-weight-bold">
              {post.category.name}
            </li>
          )}
        </ol>
      </nav>

      {/* Tiêu đề bài viết */}
      <h1
        className="font-weight-bold text-dark mb-3"
        style={{ fontSize: "38px", lineHeight: 1.2, letterSpacing: "-1px" }}
      >
        {post.title}
      </h1>

      {/* Metadata: Tác giả + Ngày đăng + Chia sẻ */}
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          {/* Avatar tác giả */}
          <div
            className="d-flex align-items-center justify-content-center mr-3 bg-dark"
            style={{ width: "44px", height: "44px" }}
          >
            <span
              className="text-white text-uppercase font-weight-bold"
              style={{ fontSize: "13px", letterSpacing: "1px" }}
            >
              {post.author
                ? post.author
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()
                : "DB"}
            </span>
          </div>
          <div>
            <p className="mb-0 font-weight-bold text-dark text-uppercase" style={{ fontSize: "12px", letterSpacing: "1px" }}>
              {post.author || "DUY BẢO"}
            </p>
            <p className="mb-0 text-muted text-uppercase" style={{ fontSize: "10px", letterSpacing: "1px" }}>
              ĐĂNG NGÀY: {formatDate(post.createdDate)}
            </p>
          </div>
        </div>

        {/* Nút chia sẻ & lưu */}
        <div className="d-flex gap-2 mt-2 mt-md-0">
          <button
            className="btn btn-outline-dark btn-sm text-uppercase"
            style={{ fontSize: "10px", letterSpacing: "1px" }}
            title="Chia sẻ bài viết"
          >
            <i className="fa-solid fa-share-nodes mr-1"></i>CHIA SẺ
          </button>
          <button
            className="btn btn-outline-dark btn-sm text-uppercase"
            style={{ fontSize: "10px", letterSpacing: "1px" }}
            title="Lưu bài viết"
          >
            <i className="fa-regular fa-bookmark mr-1"></i>LƯU
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailHero;
