import React from "react";
import { useCart } from "../context/CartContext";

// ─── Format tiền VND ─────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

// ─── CartDrawer Component ─────────────────────────────────────────
const CartDrawer = ({ isOpen, onClose }) => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } =
    useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="cart-backdrop"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1060,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* ── Drawer ── */}
      <div
        className="cart-drawer"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "min(450px, 100vw)",
          backgroundColor: "#fff",
          zIndex: 1070,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
          animation: "slideInRight 0.35s ease-out",
        }}
      >
        {/* ── Header ── */}
        <div
          className="d-flex justify-content-between align-items-center px-4 py-3"
          style={{ borderBottom: "1px solid #e2e2e2" }}
        >
          <h5
            className="mb-0 text-uppercase font-weight-bold"
            style={{ letterSpacing: "1px", fontSize: "18px" }}
          >
            Giỏ Hàng Của Bạn
          </h5>
          <button
            className="btn btn-link text-dark p-0"
            onClick={onClose}
            style={{ fontSize: "1.5rem", lineHeight: 1, textDecoration: "none" }}
            aria-label="Đóng giỏ hàng"
          >
            ✕
          </button>
        </div>

        {/* ── Body: Danh sách sản phẩm ── */}
        <div className="flex-grow-1 overflow-auto px-4 py-3">
          {items.length === 0 ? (
            <div className="text-center py-5">
              <i
                className="fa-solid fa-bag-shopping d-block mb-3"
                style={{ fontSize: "3rem", opacity: 0.15 }}
              ></i>
              <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                Giỏ hàng của bạn đang trống.
              </p>
            </div>
          ) : (
            <div className="d-flex flex-column" style={{ gap: "1.5rem" }}>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Footer: Tổng tiền + Nút hành động ── */}
        {items.length > 0 && (
          <div
            className="px-4 py-3"
            style={{
              borderTop: "1px solid #e2e2e2",
              backgroundColor: "#f8f9fa",
            }}
          >
            {/* Tổng cộng */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span
                className="text-uppercase text-muted"
                style={{ fontSize: "13px", letterSpacing: "1px" }}
              >
                Tổng Cộng ({totalItems} sp)
              </span>
              <span
                className="font-weight-bold"
                style={{ fontSize: "1.25rem" }}
              >
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* Nút */}
            <div className="d-flex flex-column" style={{ gap: "0.5rem" }}>
              <button
                className="btn btn-dark btn-block text-uppercase py-2"
                style={{ letterSpacing: "2px", fontSize: "13px" }}
              >
                Thanh Toán
              </button>
              <button
                className="btn btn-outline-dark btn-block text-uppercase py-2"
                style={{ letterSpacing: "2px", fontSize: "13px" }}
                onClick={onClose}
              >
                Tiếp Tục Mua Sắm
              </button>
            </div>
            <p
              className="text-center text-muted mt-2 mb-0"
              style={{ fontSize: "10px", letterSpacing: "0.5px" }}
            >
              Thuế và phí vận chuyển được tính khi thanh toán
            </p>
          </div>
        )}
      </div>

      {/* ── Keyframe Animation ── */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

// ─── CartItem Sub-Component ───────────────────────────────────────
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="d-flex" style={{ gap: "1rem" }}>
      {/* Hình ảnh */}
      <div
        className="flex-shrink-0 d-flex align-items-center justify-content-center"
        style={{
          width: "80px",
          height: "80px",
          backgroundColor: "#f1f1f1",
          border: "1px solid #e2e2e2",
        }}
      >
        <img
          src={item.imageUrl || "https://placehold.co/400x400/1a1a1a/666?text=GEAR"}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Thông tin */}
      <div className="flex-grow-1 d-flex flex-column justify-content-between">
        <div>
          <h6
            className="mb-1 text-uppercase font-weight-bold"
            style={{ fontSize: "14px", letterSpacing: "0.5px" }}
          >
            {item.name}
          </h6>
          {item.brand && (
            <small
              className="text-muted text-uppercase d-block"
              style={{ fontSize: "11px", letterSpacing: "1px" }}
            >
              {item.brand}
            </small>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-end">
          {/* Số lượng */}
          <div
            className="d-flex align-items-center"
            style={{ border: "1px solid #dee2e6" }}
          >
            <button
              className="btn btn-sm btn-link text-dark text-decoration-none px-2"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span
              className="px-2"
              style={{ fontSize: "13px", minWidth: "28px", textAlign: "center" }}
            >
              {item.quantity}
            </span>
            <button
              className="btn btn-sm btn-link text-dark text-decoration-none px-2"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>

          {/* Giá + Nút xóa */}
          <div className="d-flex align-items-center" style={{ gap: "0.75rem" }}>
            <span className="font-weight-bold" style={{ fontSize: "14px" }}>
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              className="btn btn-link text-muted p-0"
              onClick={() => onRemove(item.id)}
              style={{ fontSize: "0.8rem", textDecoration: "none" }}
              title="Xóa"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
