import React from "react";

/**
 * ProductReviews - Hiển thị danh sách đánh giá của khách hàng
 * @param {Object[]} reviews - Mảng review từ API
 * @param {number} rating - Điểm đánh giá trung bình
 */
const ProductReviews = ({ reviews = [], rating = 0 }) => {
  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-${i < count ? "solid" : "regular"} fa-star ${i < count ? "text-warning" : "text-muted"}`}
          style={{ fontSize: "14px" }}
        ></i>
      );
    }
    return stars;
  };

  if (!reviews || reviews.length === 0) {
    return (
      <section className="product-reviews mt-5 pt-4 border-top">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h4 className="font-weight-bold text-uppercase text-dark mb-1"
              style={{ letterSpacing: "-0.5px" }}>
              Đánh Giá Từ Khách Hàng
            </h4>
          </div>
        </div>
        <div className="text-center py-5 text-muted">
          <i className="fa-solid fa-comment-slash mb-3" style={{ fontSize: "2rem", opacity: 0.3 }}></i>
          <p className="small">Chưa có đánh giá nào cho sản phẩm này.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="product-reviews mt-5 pt-4 border-top">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-end mb-4">
        <div>
          <h4 className="font-weight-bold text-uppercase text-dark mb-1"
            style={{ letterSpacing: "-0.5px" }}>
            Đánh Giá Từ Khách Hàng
          </h4>
          <div className="d-flex align-items-center">
            <div className="mr-2">{renderStars(Math.round(rating))}</div>
            <span className="text-muted small">
              {rating} / 5.0 ({reviews.length} đánh giá)
            </span>
          </div>
        </div>
        <button
          className="btn btn-outline-dark btn-sm text-uppercase"
          style={{ letterSpacing: "1px", fontSize: "11px" }}
        >
          Viết Đánh Giá
        </button>
      </div>

      {/* Review Cards */}
      <div className="row">
        {reviews.map((review, idx) => (
          <div key={review.id || idx} className="col-md-4 mb-4">
            <div className="card border h-100 p-3 bg-white">
              {/* Tên + Badge Verified */}
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="font-weight-bold text-dark mb-0 text-uppercase"
                  style={{ fontSize: "14px" }}>
                  {review.reviewerName || "Ẩn danh"}
                </h6>
                <span className="badge badge-light border small text-muted"
                  style={{ fontSize: "9px", letterSpacing: "1px" }}>
                  ĐÃ MUA
                </span>
              </div>

              {/* Stars */}
              <div className="mb-2">{renderStars(review.rating || 5)}</div>

              {/* Comment */}
              {review.comment && (
                <p className="text-muted small mb-0" style={{ lineHeight: 1.7, fontStyle: "italic" }}>
                  "{review.comment}"
                </p>
              )}

              {/* Ngày */}
              {review.createdDate && (
                <small className="text-muted mt-auto pt-2" style={{ fontSize: "11px" }}>
                  {new Date(review.createdDate).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </small>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductReviews;
