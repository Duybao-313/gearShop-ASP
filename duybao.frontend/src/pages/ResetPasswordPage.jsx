import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import AuthCard from "../components/AuthCard";

// ──────────────────────────────────────────────
// ResetPasswordPage — Trang đặt lại mật khẩu
// ──────────────────────────────────────────────
const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setSubmitting(true);

    const result = await authService.resetPassword(
      token,
      newPassword,
      confirmPassword,
    );

    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } else {
      setError(result.error || "Đặt lại mật khẩu thất bại.");
    }

    setSubmitting(false);
  };

  // Token trống
  if (!token) {
    return (
      <AuthCard
        labelCaps="LIÊN KẾT KHÔNG HỢP LỆ"
        title={
          <>
            Thiếu
            <br />
            Token
          </>
        }
        decorText={"YÊU CẦU\nMỚI"}
        decorIcon="fa-triangle-exclamation"
        footer={
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="login-submit-btn d-inline-block text-decoration-none px-4 py-2"
            >
              YÊU CẦU LẠI
            </Link>
          </div>
        }
      >
        <div
          className="alert alert-danger rounded-0 py-2 small text-uppercase"
          style={{ letterSpacing: "1px" }}
        >
          <i className="fa-solid fa-circle-exclamation mr-2" />
          Không tìm thấy token. Vui lòng yêu cầu lại link đặt lại mật khẩu.
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      labelCaps="THIẾT LẬP LẠI"
      title={
        <>
          Mật Khẩu
          <br />
          Mới
        </>
      }
      decorText={"BẢO MẬT\nTỐI ĐA"}
      decorIcon="fa-lock"
      error={error}
      footer={
        success ? null : (
          <div className="text-center">
            <p className="login-footer-text">
              <Link to="/forgot-password" className="login-register-link">
                ← Yêu cầu token mới
              </Link>
            </p>
          </div>
        )
      }
    >
      {success ? (
        <div>
          <div
            className="alert alert-success rounded-0 py-2 small text-uppercase"
            style={{ letterSpacing: "1px" }}
          >
            <i className="fa-solid fa-circle-check mr-2" />
            Đặt lại mật khẩu thành công!
          </div>
          <p className="text-muted small mt-2" style={{ fontSize: "0.8rem" }}>
            Đang chuyển về trang đăng nhập sau 3 giây...
          </p>
          <div className="login-submit-wrapper mt-3">
            <Link
              to="/login"
              className="login-submit-btn d-block text-center text-decoration-none"
            >
              ĐĂNG NHẬP NGAY
              <i className="fa-solid fa-arrow-right ml-2" />
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <p className="text-muted small mb-3" style={{ fontSize: "0.8rem" }}>
            Nhập mật khẩu mới cho tài khoản của bạn.
          </p>

          {/* Mật khẩu mới */}
          <div className="login-field">
            <label className="login-label">MẬT KHẨU MỚI</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="login-input login-input-password"
                placeholder="Tối thiểu 6 ký tự"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

          {/* Xác nhận mật khẩu mới */}
          <div className="login-field">
            <label className="login-label">XÁC NHẬN MẬT KHẨU MỚI</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="login-input login-input-password"
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
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
                  ĐẶT LẠI MẬT KHẨU
                  <i className="fa-solid fa-check ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </AuthCard>
  );
};

export default ResetPasswordPage;
