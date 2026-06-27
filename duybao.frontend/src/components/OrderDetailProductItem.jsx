import React from "react";

const API_BASE = "http://localhost:5228";
const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_BASE}/${url.replace(/^\/+/, "")}`;
};

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price || 0);

const fallbackImg = "https://placehold.co/400x400/1a1a1a/666?text=GEAR";

const OrderDetailProductItem = ({ detail, isLast }) => {
  const imgUrl = getImageUrl(detail?.product?.imageUrl);
  const name = detail?.product?.name || `Sản phẩm #${detail?.productId || "?"}`;
  const brand = detail?.product?.brand || "";
  const lineTotal = (detail?.unitPrice || 0) * (detail?.quantity || 0);

  return (
    <div className="p-4 d-flex align-items-center"
      style={{ gap: "16px", borderBottom: isLast ? "none" : "1px solid #e2e2e2" }}>
      {/* Ảnh sản phẩm */}
      <div className="flex-shrink-0"
        style={{ width: "80px", height: "80px", backgroundColor: "#f5f5f5", overflow: "hidden" }}>
        <img src={imgUrl || fallbackImg} alt={name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={(e) => { e.target.onerror = null; e.target.src = fallbackImg; }}
          loading="lazy" />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-grow-1">
        {brand && (
          <span className="d-inline-block text-uppercase px-2 py-0 mb-1"
            style={{ fontSize: "9px", letterSpacing: "1px", backgroundColor: "#001b3d", color: "#ffdea5", fontWeight: "600" }}>
            {brand}
          </span>
        )}
        <h4 className="mb-0 font-weight-bold text-uppercase"
          style={{ fontSize: "15px", letterSpacing: "-0.3px" }}>
          {name}
        </h4>
        <small className="text-muted" style={{ fontSize: "12px" }}>
          SL: {detail?.quantity || 0} x {formatPrice(detail?.unitPrice || 0)}
        </small>
      </div>

      {/* Giá dòng */}
      <div className="text-right flex-shrink-0">
        <span className="font-weight-bold" style={{ fontSize: "18px", letterSpacing: "-0.5px" }}>
          {formatPrice(lineTotal)}
        </span>
      </div>
    </div>
  );
};

export default OrderDetailProductItem;
