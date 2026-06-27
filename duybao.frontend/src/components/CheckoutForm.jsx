import React from "react";

/**
 * CheckoutForm — Form thu thập thông tin khách hàng khi đặt hàng
 * Props:
 *   - formData: { fullName, email, phone, address, notes }
 *   - onChange: (field, value) => void
 *   - errors: { [field]: message }
 */
const CheckoutForm = ({ formData, onChange, errors = {} }) => {
  const handleChange = (field) => (e) => {
    onChange(field, e.target.value);
  };

  const inputClass = (field) =>
    `form-control rounded-0 ${errors[field] ? "is-invalid" : ""}`;

  return (
    <div className="card border p-4">
      <h5
        className="font-weight-bold text-uppercase mb-4"
        style={{ letterSpacing: "1px", fontSize: "18px" }}
      >
        <i className="fa-solid fa-user mr-2"></i>Thông Tin Giao Hàng
      </h5>

      <div className="row">
        {/* Họ Tên */}
        <div className="col-12 mb-3">
          <label
            className="text-uppercase font-weight-bold mb-1"
            style={{ fontSize: "11px", letterSpacing: "1px" }}
          >
            Họ Và Tên <span style={{ color: "#dc3545" }}>*</span>
          </label>
          <input
            type="text"
            className={inputClass("fullName")}
            placeholder="Nguyễn Văn A"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            style={{ fontSize: "14px" }}
          />
          {errors.fullName && (
            <div className="invalid-feedback" style={{ fontSize: "11px" }}>
              {errors.fullName}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="col-12 col-md-6 mb-3">
          <label
            className="text-uppercase font-weight-bold mb-1"
            style={{ fontSize: "11px", letterSpacing: "1px" }}
          >
            Email <span style={{ color: "#dc3545" }}>*</span>
          </label>
          <input
            type="email"
            className={inputClass("email")}
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange("email")}
            style={{ fontSize: "14px" }}
          />
          {errors.email && (
            <div className="invalid-feedback" style={{ fontSize: "11px" }}>
              {errors.email}
            </div>
          )}
        </div>

        {/* Số Điện Thoại */}
        <div className="col-12 col-md-6 mb-3">
          <label
            className="text-uppercase font-weight-bold mb-1"
            style={{ fontSize: "11px", letterSpacing: "1px" }}
          >
            Số Điện Thoại <span style={{ color: "#dc3545" }}>*</span>
          </label>
          <input
            type="tel"
            className={inputClass("phone")}
            placeholder="0912 345 678"
            value={formData.phone}
            onChange={handleChange("phone")}
            style={{ fontSize: "14px" }}
          />
          {errors.phone && (
            <div className="invalid-feedback" style={{ fontSize: "11px" }}>
              {errors.phone}
            </div>
          )}
        </div>

        {/* Địa Chỉ */}
        <div className="col-12 mb-3">
          <label
            className="text-uppercase font-weight-bold mb-1"
            style={{ fontSize: "11px", letterSpacing: "1px" }}
          >
            Địa Chỉ Giao Hàng <span style={{ color: "#dc3545" }}>*</span>
          </label>
          <input
            type="text"
            className={inputClass("address")}
            placeholder="Số nhà, Tên đường, Quận/Huyện, Tỉnh/Thành phố"
            value={formData.address}
            onChange={handleChange("address")}
            style={{ fontSize: "14px" }}
          />
          {errors.address && (
            <div className="invalid-feedback" style={{ fontSize: "11px" }}>
              {errors.address}
            </div>
          )}
        </div>

        {/* Ghi Chú */}
        <div className="col-12 mb-0">
          <label
            className="text-uppercase font-weight-bold mb-1"
            style={{ fontSize: "11px", letterSpacing: "1px" }}
          >
            Ghi Chú Đơn Hàng
          </label>
          <textarea
            className="form-control rounded-0"
            rows="3"
            placeholder="Ghi chú thêm về đơn hàng (nếu có)..."
            value={formData.notes}
            onChange={handleChange("notes")}
            style={{ fontSize: "14px", resize: "vertical" }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
