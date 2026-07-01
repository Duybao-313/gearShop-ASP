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
  const [submitting, setSubmitting] = useState(false);

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
        "Link đặt lại mật khẩu đã được gửi qua email (có hiệu lực trong 15 phút).",
      );
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
          <p className="text-muted small mt-3" style={{ fontSize: "0.8rem" }}>
            Vui lòng kiểm tra email của bạn và làm theo hướng dẫn để đặt lại mật khẩu.
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
