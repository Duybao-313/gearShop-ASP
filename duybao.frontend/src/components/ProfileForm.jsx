import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import userService from "../services/userService";

const ProfileForm = ({ onUpdateSuccess }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Load profile data từ service + AuthContext
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        // Lấy từ cache/localStorage trước
        const cached = userService.getCachedProfile();
        // Lấy từ API (hoặc fallback)
        const result = await userService.getProfile();
        const apiData = result.success ? result.data : null;

        setFormData({
          fullName:
            user?.fullName ||
            apiData?.fullName ||
            cached?.fullName ||
            user?.username ||
            "",
          email: apiData?.email || cached?.email || "",
          phone: apiData?.phone || cached?.phone || "",
          address: apiData?.address || cached?.address || "",
        });
      } catch (err) {
        console.error("Lỗi khi tải profile:", err);
        // Fallback: chỉ dùng user từ context
        setFormData((prev) => ({
          ...prev,
          fullName: user?.fullName || user?.username || "",
        }));
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear messages when user edits
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSaving(true);

    try {
      const result = await userService.updateProfile(formData);
      if (result.success) {
        setSuccessMsg("Cập nhật thông tin thành công!");
        if (onUpdateSuccess) onUpdateSuccess(formData);
        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setErrorMsg(result.error || "Cập nhật thất bại. Vui lòng thử lại.");
      }
    } catch {
      setErrorMsg("Không thể kết nối đến máy chủ.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only">Đang tải...</span>
        </div>
        <p className="mt-2 text-muted">Đang tải thông tin tài khoản...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {/* ─── Header ─── */}
      <header className="profile-form-header">
        <h1 className="profile-form-title">Thông Tin Tài Khoản</h1>
        <p className="profile-form-subtitle">
          Quản lý và cập nhật thông tin cá nhân của bạn để bảo mật tài khoản.
        </p>
      </header>

      {/* ─── Alert Messages ─── */}
      {errorMsg && (
        <div className="alert alert-danger rounded-0" role="alert">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="alert alert-success rounded-0" role="alert">
          <i className="fa-solid fa-circle-check mr-2"></i>
          {successMsg}
        </div>
      )}

      {/* ─── Fields Row 1: Họ tên + Email ─── */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="profile-label">HỌ VÀ TÊN</label>
          <input
            type="text"
            name="fullName"
            className="profile-input"
            placeholder="Nhập họ và tên"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-4">
          <label className="profile-label">ĐỊA CHỈ EMAIL</label>
          <input
            type="email"
            name="email"
            className="profile-input profile-input-readonly"
            placeholder="user@geartech.vn"
            value={formData.email}
            onChange={handleChange}
            readOnly
          />
          <small className="text-muted">
            <i className="fa-solid fa-lock mr-1"></i>
            Email không thể thay đổi
          </small>
        </div>
      </div>

      {/* ─── Fields Row 2: SĐT + Mật khẩu ─── */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="profile-label">SỐ ĐIỆN THOẠI</label>
          <input
            type="tel"
            name="phone"
            className="profile-input"
            placeholder="+84 xxx xxx xxx"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-4">
          <label className="profile-label">MẬT KHẨU</label>
          <div className="profile-password-field">
            <input
              type="password"
              className="profile-input"
              value="********"
              readOnly
              disabled
            />
            <button
              type="button"
              className="profile-change-password-btn"
              title="Tính năng đổi mật khẩu đang phát triển"
            >
              THAY ĐỔI MẬT KHẨU
            </button>
          </div>
        </div>
      </div>

      {/* ─── Địa chỉ giao hàng ─── */}
      <div className="mb-4">
        <label className="profile-label">ĐỊA CHỈ GIAO HÀNG</label>
        <textarea
          name="address"
          className="profile-input profile-textarea"
          placeholder="Nhập địa chỉ nhận hàng của bạn..."
          rows="3"
          value={formData.address}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* ─── Submit ─── */}
      <div className="profile-form-footer">
        <div className="profile-security-badge">
          <i className="fa-solid fa-shield-halved"></i>
          <span>THÔNG TIN ĐƯỢC BẢO MẬT MÃ HÓA 256-BIT</span>
        </div>
        <button
          type="submit"
          className="btn btn-dark btn-lg text-uppercase px-5 profile-submit-btn"
          disabled={saving}
          style={{ letterSpacing: "2px", fontSize: "13px", borderRadius: 0 }}
        >
          {saving ? (
            <>
              <span
                className="spinner-border spinner-border-sm mr-2"
                role="status"
              ></span>
              ĐANG LƯU...
            </>
          ) : (
            "CẬP NHẬT THÔNG TIN"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
