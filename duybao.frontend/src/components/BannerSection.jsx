import React from "react";

const BannerSection = () => {
  return (
    <section className="banner-hero">
      <div className="container">
        <div className="row align-items-center" style={{ minHeight: "380px" }}>
          <div className="col-lg-7 py-5">
            <span className="badge badge-warning text-dark px-3 py-2 mb-3 font-weight-medium">
              🔥 Bộ Sưu Tập Mới 2026
            </span>
            <h1 className="display-4 font-weight-bold text-dark">
              Thời Trang <span className="text-primary">Công Sở</span> & Dạ Hội
            </h1>
            <p
              className="lead text-muted my-4"
              style={{ maxWidth: "500px", lineHeight: 1.8 }}
            >
              Khám phá bộ sưu tập mới nhất với những thiết kế tinh tế, sang
              trọng dành cho quý ông và quý cô hiện đại.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <a
                href="#"
                className="btn btn-primary btn-lg rounded-pill px-4 mr-2 shadow-sm"
              >
                <i className="fa-solid fa-bag-shopping mr-2"></i>Mua Ngay
              </a>
              <a
                href="#"
                className="btn btn-outline-dark btn-lg rounded-pill px-4"
              >
                <i className="fa-regular fa-eye mr-2"></i>Xem Bộ Sưu Tập
              </a>
            </div>
            {/* Stats */}
            <div className="d-flex mt-4 pt-2">
              <div className="mr-4 pr-3 border-right">
                <strong className="text-dark h5">500+</strong>
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
            <div className="banner-image-wrapper">
              <div className="banner-circle"></div>
              <i className="fa-solid fa-tshirt text-primary banner-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
