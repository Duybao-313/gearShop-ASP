import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * OrderSidebar — Thanh điều hướng tài khoản người dùng
 * Hiển thị menu: Hồ sơ, Đơn hàng, Địa chỉ, Đăng xuất
 */
const OrderSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      to: "/account",
      icon: "fa-regular fa-user",
      label: "Hồ Sơ",
      active: location.pathname === "/account",
    },
    {
      to: "/orders",
      icon: "fa-solid fa-box",
      label: "Đơn Hàng",
      active: location.pathname === "/orders",
    },
    {
      to: "/account/addresses",
      icon: "fa-solid fa-location-dot",
      label: "Địa Chỉ",
      active: location.pathname === "/account/addresses",
    },
  ];

  return (
    <aside
      className="border p-4"
      style={{
        backgroundColor: "#f9f9f9",
        borderColor: "#e2e2e2",
      }}
    >
      <h6
        className="text-uppercase font-weight-bold mb-4"
        style={{
          fontSize: "11px",
          letterSpacing: "2px",
          color: "#74777f",
        }}
      >
        Quản Lý Tài Khoản
      </h6>
      <nav className="d-flex flex-column" style={{ gap: "6px" }}>
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="d-flex align-items-center text-decoration-none py-2 px-3"
            style={{
              gap: "12px",
              fontSize: "14px",
              fontWeight: item.active ? "700" : "500",
              color: item.active ? "#000" : "#44474e",
              backgroundColor: item.active ? "#eeeeee" : "transparent",
              borderRight: item.active
                ? "3px solid #775a19"
                : "3px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            <i
              className={item.icon}
              style={{
                fontSize: "16px",
                width: "20px",
                textAlign: "center",
              }}
            ></i>
            <span>{item.label}</span>
          </Link>
        ))}

        {/* Divider */}
        <div
          className="my-3"
          style={{ height: "1px", backgroundColor: "#e2e2e2" }}
        ></div>

        {/* Logout */}
        <Link
          to="/logout"
          className="d-flex align-items-center text-decoration-none py-2 px-3"
          style={{
            gap: "12px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#ba1a1a",
            transition: "all 0.2s ease",
          }}
        >
          <i
            className="fa-solid fa-right-from-bracket"
            style={{
              fontSize: "16px",
              width: "20px",
              textAlign: "center",
            }}
          ></i>
          <span>Đăng Xuất</span>
        </Link>
      </nav>
    </aside>
  );
};

export default OrderSidebar;
