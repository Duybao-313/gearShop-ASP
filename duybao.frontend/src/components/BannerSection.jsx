import React from "react";
import { Link } from "react-router-dom";

const BannerSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center" style={{ minHeight: "380px" }}>
          <div className="col-lg-7 py-5">
            <span className="badge badge-dark px-3 py-2 mb-3 font-weight-medium text-uppercase"
              style={{ letterSpacing: "2px", fontSize: "11px" }}>
              &#x1F525; Bộ Sưu Tập Mới 2026
            </span>
            <h1 className="display-4 font-weight-bold text-dark">
              Gaming <span className="text-dark">Gear</span> Chính Hãng
            </h1>
            <p className="lead text-muted my-4" style={{ maxWidth: "500px", lineHeight: 1.8 }}>
              Khám phá bộ sưu tập chuột, bàn phím cơ, tai nghe và màn hình gaming mới nhất dành cho game thủ chuyên nghiệp.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/products" className="btn btn-dark btn-lg px-4 mr-2 text-uppercase"
                style={{ letterSpacing: "1px", fontSize: "13px" }}>
                <i className="fa-solid fa-bag-shopping mr-2"></i>Mua Ngay
              </Link>
              <a href="#" className="btn btn-outline-dark btn-lg px-4 text-uppercase"
                style={{ letterSpacing: "1px", fontSize: "13px" }}>
                <i className="fa-regular fa-eye mr-2"></i>Xem Bộ Sưu Tập
              </a>
            </div>
            {/* Stats */}
            <div className="d-flex mt-4 pt-2">
              <div className="mr-4 pr-3 border-right">
                <strong className="text-dark h5">50+</strong>
                <p className="small text-muted mb-0">Sản phẩm</p>
              </div>
              <div className="mr-4 pr-3 border-right">
                <strong className="text-dark h5">10K+</strong>
                <p className="small text-muted mb-0">Khách hàng</p>
              </div>
              <div>
                <strong className="text-dark h5">99%</strong>
                <p className="small text-muted mb-0">Hài lòng</p>
              </div>
            </div>
          </div>
          <div className="col-lg-5 text-center d-none d-lg-block">
            <div className="hero-image-wrapper">
              <div className="hero-circle"></div>
              <i className="fa-solid fa-computer-mouse text-dark hero-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
