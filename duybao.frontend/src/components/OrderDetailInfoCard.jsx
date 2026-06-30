import React from "react";

const OrderDetailInfoCard = ({ icon, title, name, lines, badge }) => {
  return (
    <div
      className="bg-white border p-4 h-100"
      style={{ borderColor: "#e2e2e2" }}
    >
      {/* Header */}
      <div className="d-flex align-items-center mb-3" style={{ gap: "8px" }}>
        <i className={icon} style={{ fontSize: "18px", color: "#000" }}></i>
        <span
          className="text-uppercase font-weight-bold"
          style={{ fontSize: "10px", letterSpacing: "2px", color: "#000" }}
        >
          {title}
        </span>
      </div>

      {/* Content */}
      <h5 className="font-weight-bold mb-2" style={{ fontSize: "16px" }}>
        {name}
      </h5>

      {lines?.filter(Boolean).map((line, idx) => (
        <p key={idx} className="text-muted mb-1" style={{ fontSize: "13px" }}>
          {line}
        </p>
      ))}

      {/* Badge */}
      {badge && (
        <span
          className="d-inline-block text-uppercase mt-2 px-2 py-1"
          style={{
            fontSize: "10px",
            letterSpacing: "1px",
            fontWeight: "600",
            backgroundColor: "#f3f3f3",
            color: "#44474e",
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

export default OrderDetailInfoCard;
