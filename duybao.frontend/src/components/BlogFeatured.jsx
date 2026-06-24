import React from "react";
import { Link } from "react-router-dom";

const BlogFeatured = ({ post }) => {
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

  const getExcerpt = (html) => {
    if (!html) return "";
    const text = html.replace(/<[^>]*>/g, "").trim();
    return text.length > 200 ? text.substring(0, 200) + "..." : text;
  };

  return (
    <section className="mb-5">
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="row no-gutters">
          {/* Ảnh - chiếm 7 cột trên desktop */}
          <div className="col-lg-7">
            <div
              className="blog-gear-img-wrapper h-100"
              style={{ minHeight: "380px", background: "#1a1a1a" }}
            >
              <img
                src={
                  post.imageUrl ||
                  "https://placehold.co/800x500/1a1a1a/666?text=FEATURED"
                }
                alt={post.title}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
              {post.category && (
                <span
                  className="badge badge-dark position-absolute text-uppercase"
                  style={{
                    top: "20px",
                    left: "20px",
                    letterSpacing: "1px",
                    fontSize: "10px",
                    padding: "8px 16px",
                  }}
                >
                  {post.category.name}
                </span>
              )}
            </div>
          </div>

          {/* Nội dung - chiếm 5 cột trên desktop */}
          <div className="col-lg-5 d-flex align-items-center bg-white p-4 p-lg-5">
            <div>
              <span
                className="badge badge-dark px-3 py-1 mb-3 text-uppercase"
                style={{ letterSpacing: "2px", fontSize: "10px" }}
              >
                BÀI VIẾT NỔI BẬT
              </span>
              <p
                className="text-muted mb-2"
                style={{ fontSize: "13px", letterSpacing: "0.5px" }}
              >
                {formatDate(post.createdDate)}
              </p>
              <h2
                className="font-weight-bold text-dark mb-3"
                style={{ fontSize: "26px", lineHeight: 1.3, letterSpacing: "-0.5px" }}
              >
                {post.title}
              </h2>
              <p
                className="text-muted mb-4"
                style={{ fontSize: "15px", lineHeight: 1.7 }}
              >
                {getExcerpt(post.content)}
              </p>
              <Link
                to={`/blog/${post.id}`}
                className="btn btn-dark btn-lg text-uppercase"
                style={{ letterSpacing: "1px", fontSize: "12px" }}
              >
                ĐỌC BÀI VIẾT{" "}
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogFeatured;
