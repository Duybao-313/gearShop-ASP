import React from "react";

/**
 * AuthCard — Bố cục dùng chung cho các trang xác thực (Đăng nhập / Đăng ký).
 * Cung cấp grid overlay nền, card trắng, và ảnh trang trí desktop.
 *
 * Props:
 *  - labelCaps  : Dòng chữ in hoa nhỏ phía trên tiêu đề (vd: "TRUY CẬP AN TOÀN")
 *  - title      : Tiêu đề lớn trong card (có thể dùng <br/> để xuống dòng)
 *  - decorText  : Dòng chữ trang trí bên phải (vd: "CHÍNH XÁC\nĐẲNG CẤP")
 *  - decorIcon  : Class icon Font Awesome cho ảnh trang trí (vd: "fa-microchip")
 *  - error      : Thông báo lỗi (nếu có)
 *  - children   : Nội dung form bên trong card
 *  - footer     : Phần footer phía dưới form (link chuyển trang, v.v.)
 */
const AuthCard = ({
  labelCaps,
  title,
  decorText,
  decorIcon = "fa-microchip",
  error,
  children,
  footer,
}) => {
  return (
    <main className="login-page-wrapper">
      {/* Background grid decoration */}
      <div className="login-grid-overlay" />

      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "85vh" }}
        >
          <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            {/* ─── Auth Card ─── */}
            <div className="login-card">
              {/* Header */}
              <div className="login-card-header">
                <span className="login-label-caps">{labelCaps}</span>
                <h1 className="login-title">{title}</h1>
              </div>

              {/* Error message */}
              {error && (
                <div
                  className="alert alert-danger rounded-0 py-2 small text-uppercase"
                  style={{ letterSpacing: "1px" }}
                >
                  <i className="fa-solid fa-triangle-exclamation mr-2" />
                  {error}
                </div>
              )}

              {/* Form content */}
              {children}

              {/* Footer */}
              {footer}
            </div>
          </div>

          {/* Decorative image (desktop only) */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
            <div className="login-decor-image">
              <div className="login-decor-placeholder">
                <i
                  className={`fa-solid ${decorIcon}`}
                  style={{ fontSize: "10rem", opacity: 0.08 }}
                />
                <div className="login-decor-text">{decorText}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthCard;
