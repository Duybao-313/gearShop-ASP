import React from "react";
import { useCart } from "../context/CartContext";

// ─── Format tiền VND ─────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

/**
 * OrderReview — Hiển thị danh sách sản phẩm trong đơn hàng (read-only)
 * và tổng kết giá tiền trước khi đặt hàng.
 */
const OrderReview = () => {
  const { items, totalPrice } = useCart();

  const subtotal = totalPrice;
  const shipping = 0; // Miễn phí vận chuyển
  const taxRate = 0.08; // 8% VAT
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="card border p-4 text-center">
        <i
          className="fa-solid fa-box-open d-block mb-2"
          style={{ fontSize: "36px", color: "#c4c6cf" }}
        ></i>
        <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
          Không có sản phẩm nào trong đơn hàng
        </p>
      </div>
    );
  }

  return (
    <div className="card border">
      {/* Header */}
      <div className="p-3 border-bottom bg-light">
        <h5
          className="font-weight-bold text-uppercase mb-0"
          style={{ letterSpacing: "1px", fontSize: "16px" }}
        >
          <i className="fa-solid fa-clipboard-list mr-2"></i>Kiểm Tra Đơn Hàng
        </h5>
      </div>

      {/* Items List */}
      <div className="p-3">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`d-flex align-items-center py-3 ${
              idx < items.length - 1 ? "border-bottom" : ""
            }`}
          >
            {/* Ảnh */}
            <div
              className="mr-3 bg-light border d-flex align-items-center justify-content-center"
              style={{
                width: "64px",
                height: "64px",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <img
                src={
                  item.imageUrl ||
                  "https://placehold.co/400x400/1a1a1a/666?text=GEAR"
                }
                alt={item.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Tên + Brand */}
            <div className="flex-grow-1 mr-2" style={{ minWidth: 0 }}>
              {item.brand && (
                <span
                  className="badge badge-light text-uppercase mb-1 d-inline-block"
                  style={{ fontSize: "9px", letterSpacing: "1px" }}
                >
                  {item.brand}
                </span>
              )}
              <h6
                className="mb-0 text-uppercase font-weight-bold text-truncate"
                style={{ fontSize: "13px" }}
              >
                {item.name}
              </h6>
              <small className="text-muted" style={{ fontSize: "11px" }}>
                SL: {item.quantity} x {formatPrice(item.price)}
              </small>
            </div>

            {/* Thành tiền */}
            <div
              className="text-right font-weight-bold"
              style={{ fontSize: "14px", flexShrink: 0 }}
            >
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="border-top p-3 bg-light">
        {/* Tạm tính */}
        <div className="d-flex justify-content-between mb-2">
          <span
            className="text-muted text-uppercase"
            style={{ fontSize: "12px", letterSpacing: "1px" }}
          >
            Tạm Tính
          </span>
          <span style={{ fontSize: "14px" }}>{formatPrice(subtotal)}</span>
        </div>

        {/* Vận chuyển */}
        <div className="d-flex justify-content-between mb-2">
          <span
            className="text-muted text-uppercase"
            style={{ fontSize: "12px", letterSpacing: "1px" }}
          >
            Vận Chuyển
          </span>
          <span
            className="font-weight-bold text-uppercase"
            style={{ fontSize: "11px", color: "#775a19", letterSpacing: "1px" }}
          >
            Miễn Phí
          </span>
        </div>

        {/* Thuế */}
        <div className="d-flex justify-content-between mb-2">
          <span
            className="text-muted text-uppercase"
            style={{ fontSize: "12px", letterSpacing: "1px" }}
          >
            Thuế (VAT 8%)
          </span>
          <span style={{ fontSize: "14px" }}>{formatPrice(tax)}</span>
        </div>

        {/* Tổng Cộng */}
        <div className="d-flex justify-content-between pt-2 border-top mt-2">
          <span
            className="font-weight-bold text-uppercase"
            style={{ fontSize: "15px", letterSpacing: "1px" }}
          >
            Tổng Cộng
          </span>
          <span
            className="font-weight-bold"
            style={{ fontSize: "22px", lineHeight: 1 }}
          >
            {formatPrice(grandTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
