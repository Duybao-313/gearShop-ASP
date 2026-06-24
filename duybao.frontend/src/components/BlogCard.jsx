import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Lấy đoạn mô tả ngắn từ nội dung HTML (strip tags, giới hạn ~120 ký tự)
  const getExcerpt = (html) => {
    if (!html) return "Nhấn để xem chi tiết bài viết...";
    const text = html.replace(/<[^>]*>/g, "").trim();
    return text.length > 130 ? text.substring(0, 130) + "..." : text;
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card blog-gear-card h-100 border-0 shadow-sm">
        {/* Ảnh */}
        <div className="blog-gear-img-wrapper position-relative overflow-hidden">
          <img
            src={
              post.imageUrl ||
              "https://placehold.co/600x400/1a1a1a/666?text=BLOG"
            }
            className="card-img-top"
            alt={post.title}
            loading="lazy"
          />
          {/* Category Badge */}
          {post.category && (
            <span
              className="badge badge-dark position-absolute text-uppercase"
              style={{
                top: "12px",
                left: "12px",
                letterSpacing: "1px",
                fontSize: "10px",
                padding: "6px 12px",
              }}
            >
              {post.category.name}
            </span>
          )}
        </div>

        {/* Nội dung */}
        <div className="card-body d-flex flex-column p-4">
          {/* Meta: ngày + tác giả */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small
              className="text-muted text-uppercase"
              style={{ fontSize: "10px", letterSpacing: "1px" }}
            >
              {formatDate(post.createdDate)}
            </small>
            <small
              className="text-muted"
              style={{ fontSize: "10px", letterSpacing: "1px" }}
            >
              <i className="fa-regular fa-clock mr-1"></i>
              {post.readTime || "5 phút đọc"}
            </small>
          </div>

          {/* Tiêu đề */}
          <h5
            className="card-title font-weight-bold text-dark mb-2"
            style={{ lineHeight: 1.3 }}
          >
            {post.title}
          </h5>

          {/* Mô tả ngắn */}
          <p
            className="card-text text-muted flex-grow-1 mb-3"
            style={{ fontSize: "14px", lineHeight: 1.6 }}
          >
            {getExcerpt(post.content)}
          </p>

          {/* Link đọc tiếp */}
          <Link
            to={`/blog/${post.id}`}
            className="btn btn-outline-dark btn-sm text-uppercase mt-auto align-self-start"
            style={{ letterSpacing: "1px", fontSize: "11px" }}
          >
            Đọc tiếp <i className="fa-solid fa-arrow-right ml-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
