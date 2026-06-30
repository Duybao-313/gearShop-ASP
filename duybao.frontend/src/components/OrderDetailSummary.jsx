import React from "react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price || 0,
  );

const OrderDetailSummary = ({
  subtotal,
  shipping,
  tax,
  grandTotal,
  itemCount,
}) => {
  return (
    <div className="bg-white border p-4" style={{ borderColor: "#e2e2e2" }}>
      <span
        className="d-block text-uppercase mb-3"
        style={{
          fontSize: "10px",
          letterSpacing: "2px",
          color: "#74777f",
          fontWeight: "600",
        }}
      >
        TỔNG KẾT CHI PHÍ
      </span>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <span style={{ fontSize: "14px" }}>
          Tạm tính ({itemCount} sản phẩm)
        </span>
        <span style={{ fontSize: "14px" }}>{formatPrice(subtotal)}</span>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <span style={{ fontSize: "14px" }}>Phí vận chuyển</span>
        <span style={{ fontSize: "14px" }}>
          {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
        </span>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <span style={{ fontSize: "14px" }}>Thuế (VAT 8%)</span>
        <span style={{ fontSize: "14px" }}>{formatPrice(tax)}</span>
      </div>

      <div className="pt-3 mt-2" style={{ borderTop: "1px solid #e2e2e2" }}>
        <div className="d-flex justify-content-between align-items-end">
          <span
            className="font-weight-bold text-uppercase"
            style={{ fontSize: "16px", letterSpacing: "0.5px" }}
          >
            TỔNG CỘNG
          </span>
          <span
            className="font-weight-bold"
            style={{ fontSize: "26px", letterSpacing: "-1px", color: "#000" }}
          >
            {formatPrice(grandTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSummary;
