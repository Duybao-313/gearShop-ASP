import React from "react";

/**
 * BlogDetailContent — Hiển thị nội dung HTML của bài viết + ảnh đại diện
 * Sử dụng dangerouslySetInnerHTML vì nội dung bài viết là HTML từ CMS
 */
const BlogDetailContent = ({ post }) => {
  if (!post) return null;

  return (
    <div className="col-12">
      {/* Ảnh đại diện bài viết */}
      {post.imageUrl && (
        <div className="mb-4 overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-100"
            style={{ maxHeight: "480px", objectFit: "cover" }}
            loading="lazy"
          />
        </div>
      )}

      {/* Nội dung HTML bài viết */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{
          fontSize: "17px",
          lineHeight: 1.9,
          color: "#333",
          wordBreak: "break-word",
        }}
      />

      {/* Đường kẻ cuối bài */}
      <hr className="my-5" style={{ borderColor: "#ddd" }} />

      {/* Gợi ý xem sản phẩm */}
      <div
        className="p-4 mb-4"
        style={{
          backgroundColor: "#f8f8f8",
          borderLeft: "4px solid #000",
        }}
      >
        <p className="text-uppercase font-weight-bold mb-2 text-dark" style={{ fontSize: "13px", letterSpacing: "2px" }}>
          <i className="fa-solid fa-shop mr-2"></i>KHÁM PHÁ SẢN PHẨM
        </p>
        <p className="text-muted mb-3" style={{ fontSize: "15px", lineHeight: 1.6 }}>
          Ghé thăm cửa hàng của chúng tôi để khám phá các sản phẩm gaming gear chính hãng với giá tốt nhất.
        </p>
        <a href="/products" className="btn btn-dark text-uppercase" style={{ fontSize: "12px", letterSpacing: "1px" }}>
          XEM CỬA HÀNG <i className="fa-solid fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>
  );
};

export default BlogDetailContent;
