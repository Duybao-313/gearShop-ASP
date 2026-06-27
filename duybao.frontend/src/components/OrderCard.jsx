import React from "react";
import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";

// ─── Format tiền VND ─────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

// ─── Format ngày ──────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// ─── Cấu hình theo trạng thái ─────────────────────────────────────
const getStatusConfig = (status) => {
  const configs = {
    0: {
      dateLabel: null,
      primaryAction: { label: "HỦY ĐƠN", to: null, variant: "danger" },
      secondaryAction: { label: "XEM CHI TIẾT", to: null, variant: "primary" },
    },
    1: {
      dateLabel: null,
      primaryAction: { label: "THEO DÕI ĐƠN", to: null, variant: "outline" },
      secondaryAction: { label: "XEM CHI TIẾT", to: null, variant: "primary" },
    },
    2: {
      dateLabel: null,
      primaryAction: { label: "MUA LẠI", to: null, variant: "outline" },
      secondaryAction: { label: "XEM CHI TIẾT", to: null, variant: "primary" },
    },
  };
  return configs[status] || configs[0];
};

// ─── OrderCard Component ──────────────────────────────────────────
const OrderCard = ({ order }) => {
  const statusConfig = getStatusConfig(order.status);

  // Lấy sản phẩm đầu tiên trong đơn để hiển thị ảnh
  const firstDetail = order.orderDetails?.[0];
  const productImage =
    firstDetail?.product?.imageUrl ||
    "https://placehold.co/400x400/1a1a1a/666?text=GEAR";

  // Tính tổng tiền từ các dòng orderDetail
  const totalAmount =
    order.orderDetails?.reduce(
      (sum, d) => sum + (d.unitPrice || 0) * (d.quantity || 1),
      0,
    ) || 0;

  // Tên sản phẩm chính
  const mainProductName = firstDetail?.product?.name || `Đơn hàng #${order.id}`;

  // Số lượng sản phẩm khác
  const otherItemsCount = (order.orderDetails?.length || 1) - 1;

  return (
    <div
      className="border mb-4"
      style={{
        borderColor: "#e2e2e2",
        backgroundColor: "#fff",
        transition: "border-color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#000")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e2e2e2")}
    >
      <div className="row no-gutters align-items-center p-4">
        {/* Ảnh sản phẩm */}
        <div className="col-12 col-lg-2 mb-3 mb-lg-0">
          <div
            className="w-100"
            style={{
              aspectRatio: "1/1",
              backgroundColor: "#eeeeee",
              overflow: "hidden",
            }}
          >
            <img
              src={productImage}
              alt={mainProductName}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="col-12 col-lg-10">
          {/* Header: Mã đơn + Tên SP + Trạng thái */}
          <div className="d-flex flex-wrap justify-content-between align-items-start mb-3">
            <div>
              <p
                className="mb-1 text-uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#775a19",
                  fontWeight: "600",
                }}
              >
                ĐƠN HÀNG #{String(order.id).padStart(5, "0")}
              </p>
              <h4
                className="mb-0 font-weight-bold text-uppercase"
                style={{
                  fontSize: "18px",
                  letterSpacing: "-0.5px",
                }}
              >
                {mainProductName}
              </h4>
              {otherItemsCount > 0 && (
                <small style={{ color: "#74777f" }}>
                  + {otherItemsCount} sản phẩm khác
                </small>
              )}
            </div>
            <OrderStatusBadge status={order.status} dateLabel={null} />
          </div>

          {/* Footer: Ngày mua + Tổng tiền + Actions */}
          <div className="row pt-3" style={{ borderTop: "1px solid #e2e2e2" }}>
            <div className="col-6 col-md-3">
              <small
                className="d-block text-uppercase mb-1"
                style={{
                  fontSize: "10px",
                  letterSpacing: "1px",
                  color: "#74777f",
                }}
              >
                Ngày Đặt
              </small>
              <span className="font-weight-bold" style={{ fontSize: "14px" }}>
                {formatDate(order.orderDate)}
              </span>
            </div>
            <div className="col-6 col-md-3">
              <small
                className="d-block text-uppercase mb-1"
                style={{
                  fontSize: "10px",
                  letterSpacing: "1px",
                  color: "#74777f",
                }}
              >
                Tổng Tiền
              </small>
              <span
                className="font-weight-bold"
                style={{ fontSize: "18px", letterSpacing: "-0.5px" }}
              >
                {formatPrice(totalAmount)}
              </span>
            </div>
            <div
              className="col-12 col-md-6 mt-3 mt-md-0 d-flex justify-content-end align-items-center"
              style={{ gap: "12px" }}
            >
              {/* Nút phụ */}
              {statusConfig.secondaryAction && (
                <Link
                  to={`/orders/${order.id}`}
                  className="btn text-uppercase"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "2px",
                    fontWeight: "600",
                    borderRadius: "0",
                    padding: "10px 24px",
                    color: "#000",
                    border: "1px solid #000",
                    backgroundColor: "transparent",
                  }}
                >
                  {statusConfig.secondaryAction.label}
                </Link>
              )}
              {/* Nút chính */}
              {statusConfig.primaryAction &&
              statusConfig.primaryAction.variant === "danger" ? (
                <button
                  className="btn text-uppercase"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "2px",
                    fontWeight: "600",
                    borderRadius: "0",
                    padding: "10px 24px",
                    color: "#ba1a1a",
                    border: "1px solid rgba(186,26,26,0.5)",
                    backgroundColor: "transparent",
                  }}
                >
                  {statusConfig.primaryAction.label}
                </button>
              ) : statusConfig.primaryAction.variant === "primary" ? (
                <Link
                  to={`/orders/${order.id}`}
                  className="btn text-uppercase"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "2px",
                    fontWeight: "600",
                    borderRadius: "0",
                    padding: "10px 24px",
                    color: "#fff",
                    backgroundColor: "#000",
                    border: "1px solid #000",
                  }}
                >
                  {statusConfig.primaryAction.label}
                </Link>
              ) : (
                <button
                  className="btn text-uppercase"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "2px",
                    fontWeight: "600",
                    borderRadius: "0",
                    padding: "10px 24px",
                    color: "#000",
                    border: "1px solid #000",
                    backgroundColor: "transparent",
                  }}
                >
                  {statusConfig.primaryAction.label}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
