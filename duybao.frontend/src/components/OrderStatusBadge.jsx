import React from "react";

/**
 * OrderStatusBadge — Hiển thị trạng thái đơn hàng với màu sắc & icon
 *
 * @param {Object} props
 * @param {number} props.status - 0: Chờ duyệt, 1: Đang giao, 2: Đã giao
 * @param {string} props.dateLabel - Nhãn ngày (VD: "DỰ KIẾN GIAO: 24/10")
 */
const OrderStatusBadge = ({ status, dateLabel }) => {
  const statusConfig = {
    0: {
      label: "ĐANG XỬ LÝ",
      bgColor: "rgba(119,90,25,0.1)",
      textColor: "#775a19",
      borderColor: "rgba(119,90,25,0.3)",
      dotColor: "#775a19",
      icon: "fa-solid fa-clock",
    },
    1: {
      label: "ĐANG GIAO",
      bgColor: "rgba(34,197,94,0.08)",
      textColor: "#16a34a",
      borderColor: "rgba(34,197,94,0.3)",
      dotColor: "#16a34a",
      icon: "fa-solid fa-truck-fast",
    },
    2: {
      label: "ĐÃ GIAO",
      bgColor: "#eeeeee",
      textColor: "#44474e",
      borderColor: "#c4c6cf",
      dotColor: "#74777f",
      icon: "fa-solid fa-circle-check",
    },
    3: {
      label: "ĐÃ HỦY",
      bgColor: "rgba(220,53,69,0.08)",
      textColor: "#ba1a1a",
      borderColor: "rgba(220,53,69,0.3)",
      dotColor: "#ba1a1a",
      icon: "fa-solid fa-circle-xmark",
    },
  };

  const config = statusConfig[status] || statusConfig[0];

  return (
    <div className="text-right">
      <span
        className="d-inline-flex align-items-center px-3 py-1"
        style={{
          gap: "8px",
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "1px",
          color: config.textColor,
          backgroundColor: config.bgColor,
          border: `1px solid ${config.borderColor}`,
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: config.dotColor,
            display: "inline-block",
          }}
        ></span>
        <i className={config.icon} style={{ fontSize: "12px" }}></i>
        {config.label}
      </span>
      {dateLabel && (
        <p
          className="mt-2 mb-0 text-uppercase"
          style={{ fontSize: "10px", letterSpacing: "1px", color: "#74777f" }}
        >
          {dateLabel}
        </p>
      )}
    </div>
  );
};

export default OrderStatusBadge;
