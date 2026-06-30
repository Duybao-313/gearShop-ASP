import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthCard from "../components/AuthCard";

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
    <AuthCard
      labelCaps="TRUY CẬP AN TOÀN"
      title={
        <>
          Đăng
          <br />
          Nhập
        </>
      }
      decorText={"CHÍNH XÁC\nĐẲNG CẤP"}
      decorIcon="fa-microchip"
      error={error}
      footer={
        <div className="text-center">
          <p className="login-footer-text">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="login-register-link">
              Tạo Tài Khoản
            </Link>
          </p>
        </div>
      }
    >
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
            <Link to="/forgot-password" className="login-forgot-link">
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
              <i
                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              />
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
                <span
                  className="spinner-border spinner-border-sm mr-2"
                  role="status"
                />
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
      <div
        className="row no-gutters"
        style={{ gap: "8px", marginBottom: "24px" }}
      >
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
    </AuthCard>
  );
};

export default LoginPage;
