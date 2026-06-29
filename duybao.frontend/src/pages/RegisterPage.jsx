import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";
import AuthCard from "../components/AuthCard";

// ──────────────────────────────────────────────
// RegisterPage — Trang đăng ký tài khoản mới
// ──────────────────────────────────────────────
const RegisterPage = () => {
  const { setUserAfterRegister } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ─── Validate form ───
  const validate = () => {
    if (!username.trim() || !password.trim()) {
      return "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.";
    }
    if (!email.trim()) {
      return "Vui lòng nhập địa chỉ email.";
    }
    if (password.length < 6) {
      return "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    if (password !== confirmPassword) {
      return "Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.";
    }
    return null;
  };

  // ─── Submit đăng ký ───
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    // Gọi API đăng ký qua authService
    const result = await authService.register(
      username.trim(),
      password,
      fullName.trim() || username.trim(),
      email.trim(),
    );

    if (result.success) {
      // Cập nhật AuthContext sau khi đăng ký thành công
      setUserAfterRegister(username.trim());
      navigate("/");
    } else {
      setError(result.error || "Đăng ký thất bại. Vui lòng thử lại.");
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      labelCaps="BẢO MẬT TỐI ĐA"
      title={
        <>
          Tạo
          <br />
          Tài Khoản
        </>
      }
      decorText={"KHỞI ĐẦU\nHÀNH TRÌNH"}
      decorIcon="fa-user-plus"
      error={error}
      footer={
        <div className="text-center">
          <p className="login-footer-text">
            Đã có tài khoản?{" "}
            <Link to="/login" className="login-register-link">
              Đăng Nhập
            </Link>
          </p>
        </div>
      }
    >
      {/* ─── Register Form ─── */}
      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="login-field">
          <label className="login-label">HỌ & TÊN</label>
          <input
            type="text"
            className="login-input"
            placeholder="NGUYỄN VĂN A"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <div className="login-field">
          <label className="login-label">EMAIL</label>
          <input
            type="email"
            className="login-input"
            placeholder="user@geartech.vn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        {/* Username */}
        <div className="login-field">
          <label className="login-label">TÊN ĐĂNG NHẬP</label>
          <input
            type="text"
            className="login-input"
            placeholder="gamethu99"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        {/* Password */}
        <div className="login-field">
          <label className="login-label">MẬT KHẨU</label>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="login-input login-input-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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

        {/* Confirm Password */}
        <div className="login-field">
          <label className="login-label">XÁC NHẬN MẬT KHẨU</label>
          <div className="position-relative">
            <input
              type={showConfirm ? "text" : "password"}
              className="login-input login-input-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="login-password-toggle"
              onClick={() => setShowConfirm(!showConfirm)}
              tabIndex={-1}
              aria-label={showConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              <i
                className={`fa-solid ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}
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
                ĐANG XỬ LÝ...
              </>
            ) : (
              <>
                Tạo Tài Khoản
                <i className="fa-solid fa-user-plus ml-2" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="login-divider">
        <span>Hoặc đăng ký với</span>
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

export default RegisterPage;
