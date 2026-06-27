import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// ─── Format tiền VND ─────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

// ─── CartSummary Component ───────────────────────────────────────
const CartSummary = () => {
  const { items, totalPrice } = useCart();

  const subtotal = totalPrice;
  const shipping = 0; // Miễn phí vận chuyển
  const taxRate = 0.08; // 8% VAT
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="card border p-4 sticky-top" style={{ top: "100px" }}>
      <h5
        className="font-weight-bold text-uppercase mb-3"
        style={{ letterSpacing: "1px", fontSize: "18px" }}
      >
        Tóm Tắt Đơn Hàng
      </h5>

      <div className="mb-3">
        {/* Subtotal */}
        <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-dashed">
          <span
            className="text-muted text-uppercase"
            style={{ fontSize: "12px", letterSpacing: "1px" }}
          >
            Tạm tính
          </span>
          <span className="font-weight-medium" style={{ fontSize: "15px" }}>
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* Shipping */}
        <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-dashed">
          <span
            className="text-muted text-uppercase"
            style={{ fontSize: "12px", letterSpacing: "1px" }}
          >
            Vận chuyển dự kiến
          </span>
          <span
            className="font-weight-bold text-uppercase"
            style={{ fontSize: "11px", color: "#775a19", letterSpacing: "1px" }}
          >
            Miễn Phí
          </span>
        </div>

        {/* Tax */}
        <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-dashed">
          <span
            className="text-muted text-uppercase"
            style={{ fontSize: "12px", letterSpacing: "1px" }}
          >
            Thuế (VAT 8%)
          </span>
          <span className="font-weight-medium" style={{ fontSize: "15px" }}>
            {formatPrice(tax)}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="d-flex justify-content-between align-items-end mb-4">
        <span
          className="font-weight-bold text-uppercase"
          style={{ fontSize: "16px", letterSpacing: "1px" }}
        >
          Tổng Cộng
        </span>
        <span
          className="font-weight-bold"
          style={{ fontSize: "24px", lineHeight: 1 }}
        >
          {formatPrice(grandTotal)}
        </span>
      </div>

      {/* Checkout Button */}
      <Link
        to="/pay"
        className="btn btn-dark btn-block text-uppercase py-3 mb-2 d-block text-center"
        style={{
          letterSpacing: "2px",
          fontSize: "12px",
          fontWeight: 600,
          borderRadius: 0,
          textDecoration: "none",
        }}
      >
        <i className="fa-solid fa-lock mr-2"></i>Tiến Hành Thanh Toán
      </Link>
      <p
        className="text-center text-muted mb-0"
        style={{ fontSize: "10px", letterSpacing: "0.5px" }}
      >
        Thanh toán được mã hóa bảo mật
      </p>

      {/* Promotion Code */}
      <div className="mt-4 pt-3 border-top">
        <span
          className="text-muted text-uppercase d-block mb-2"
          style={{ fontSize: "11px", letterSpacing: "1px" }}
        >
          Mã Khuyến Mãi
        </span>
        <div className="d-flex">
          <input
            className="form-control form-control-sm rounded-0 border"
            type="text"
            placeholder="NHẬP MÃ"
            style={{ fontSize: "11px", letterSpacing: "1px" }}
          />
          <button
            className="btn btn-dark btn-sm rounded-0 ml-2 text-uppercase"
            style={{
              fontSize: "11px",
              letterSpacing: "1px",
              whiteSpace: "nowrap",
            }}
          >
            Áp Dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
