import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      return;
    }

    setSubmitting(true);

    // Backend MVC Login dùng "username" làm tên trường,
    // nhưng UI hiển thị "Email" cho người dùng.
    const result = await login(email.trim(), password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Đăng nhập thất bại. Vui lòng thử lại.");
      setSubmitting(false);
    }
  };

  return (
    <main className="login-page-wrapper">
      {/* Background grid decoration */}
      <div className="login-grid-overlay" />

      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ minHeight: "85vh" }}>
          <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            {/* ─── Login Card ─── */}
            <div className="login-card">
              {/* Header */}
              <div className="login-card-header">
                <span className="login-label-caps">TRUY CẬP AN TOÀN</span>
                <h1 className="login-title">
                  Đăng
                  <br />
                  Nhập
                </h1>
              </div>

              {/* Error message */}
              {error && (
                <div className="alert alert-danger rounded-0 py-2 small text-uppercase" style={{ letterSpacing: "1px" }}>
                  <i className="fa-solid fa-triangle-exclamation mr-2" />
                  {error}
                </div>
              )}

              {/* ─── Login Form ─── */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Email / Username */}
                <div className="login-field">
                  <label className="login-label">TÊN ĐĂNG NHẬP / EMAIL</label>
                  <input
                    type="text"
                    className="login-input"
                    placeholder="user@geartech.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                  />
                </div>

                {/* Password */}
                <div className="login-field">
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="login-label">MẬT KHẨU</label>
                    <Link
                      to="/forgot-password"
                      className="login-forgot-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Quên?
                    </Link>
                  </div>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="login-input login-input-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <div className="login-submit-wrapper">
                  <button
                    type="submit"
                    className="login-submit-btn"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm mr-2" role="status" />
                        ĐANG XÁC THỰC...
                      </>
                    ) : (
                      <>
                        Đăng Nhập
                        <i className="fa-solid fa-arrow-right ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="login-divider">
                <span>Hoặc đăng nhập với</span>
              </div>

              {/* Social buttons (decorative) */}
              <div className="row no-gutters" style={{ gap: "8px", marginBottom: "24px" }}>
                <div className="col">
                  <button type="button" className="login-social-btn" disabled>
                    <i className="fa-brands fa-google mr-2" />
                    Google
                  </button>
                </div>
                <div className="col">
                  <button type="button" className="login-social-btn" disabled>
                    <i className="fa-brands fa-apple mr-2" />
                    Apple
                  </button>
                </div>
              </div>

              {/* Footer link */}
              <div className="text-center">
                <p className="login-footer-text">
                  Chưa có tài khoản?{" "}
                  <Link to="/register" className="login-register-link" onClick={(e) => e.preventDefault()}>
                    Tạo Tài Khoản
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Decorative image (desktop only) */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
            <div className="login-decor-image">
              <div className="login-decor-placeholder">
                <i className="fa-solid fa-microchip" style={{ fontSize: "10rem", opacity: 0.08 }} />
                <div className="login-decor-text">
                  CHÍNH XÁC
                  <br />
                  ĐẲNG CẤP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
