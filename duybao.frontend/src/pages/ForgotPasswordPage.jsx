import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import AuthCard from "../components/AuthCard";

// ──────────────────────────────────────────────
// ForgotPasswordPage — Trang quên mật khẩu
// ──────────────────────────────────────────────
const ForgotPasswordPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Trích xuất token từ URL reset của backend
  const extractToken = (backendUrl) => {
    try {
      const url = new URL(backendUrl);
      return url.searchParams.get("token") || "";
    } catch {
      // Fallback: parse thủ công nếu URL không chuẩn
      const match = backendUrl.match(/[?&]token=([^&\s]+)/);
      return match ? match[1] : "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!username.trim()) {
      setError("Vui lòng nhập tên đăng nhập.");
      return;
    }

    setSubmitting(true);

    const result = await authService.forgotPassword(username.trim());

    if (result.success) {
      setMessage(
        "Link đặt lại mật khẩu đã được tạo (có hiệu lực trong 15 phút):",
      );
      setResetToken(extractToken(result.resetLink || ""));
    } else {
      setError(result.error || "Có lỗi xảy ra. Vui lòng thử lại.");
    }

    setSubmitting(false);
  };

  return (
    <AuthCard
      labelCaps="KHÔI PHỤC TRUY CẬP"
      title={
        <>
          Quên
          <br />
          Mật Khẩu
        </>
      }
      decorText={"AN TOÀN\nBẢO MẬT"}
      decorIcon="fa-key"
      error={error}
      footer={
        <div className="text-center">
          <p className="login-footer-text">
            <Link to="/login" className="login-register-link">
              ← Quay lại đăng nhập
            </Link>
          </p>
        </div>
      }
    >
      {/* ─── Form hoặc kết quả ─── */}
      {message ? (
        <div>
          <div
            className="alert alert-success rounded-0 py-2 small text-uppercase"
            style={{ letterSpacing: "1px" }}
          >
            <i className="fa-solid fa-circle-check mr-2" />
            {message}
          </div>
          {resetToken && (
            <div className="login-submit-wrapper mt-3">
              <Link
                to={`/reset-password?token=${resetToken}`}
                className="login-submit-btn d-block text-center text-decoration-none"
              >
                ĐẶT LẠI MẬT KHẨU NGAY
                <i className="fa-solid fa-arrow-right ml-2" />
              </Link>
            </div>
          )}
          <p className="text-muted small mt-3" style={{ fontSize: "0.75rem" }}>
            <em>Trong môi trường thực tế, link này sẽ được gửi qua email.</em>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <p className="text-muted small mb-3" style={{ fontSize: "0.8rem" }}>
            Nhập tên đăng nhập của bạn, chúng tôi sẽ tạo link đặt lại mật khẩu.
          </p>

          <div className="login-field">
            <label className="login-label">TÊN ĐĂNG NHẬP</label>
            <input
              type="text"
              className="login-input"
              placeholder="Nhập tên đăng nhập..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
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
                  GỬI YÊU CẦU
                  <i className="fa-solid fa-paper-plane ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </AuthCard>
  );
};

export default ForgotPasswordPage;
