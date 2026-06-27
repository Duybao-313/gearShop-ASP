import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const NavBar = ({ onCartClick }) => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top border-bottom">
      <div className="container">
        {/* Logo */}
        <Link
          className="navbar-brand font-weight-bold text-uppercase text-dark"
          to="/"
          style={{ letterSpacing: "2px", fontSize: "18px" }}
        >
          <i className="fa-solid fa-microchip mr-2"></i>GEAR TECH
        </Link>

        {/* Toggle for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link font-weight-medium px-3 text-uppercase"
                to="/"
                end
                style={{ fontSize: "14px", letterSpacing: "1px" }}
              >
                Trang Chủ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link font-weight-medium px-3 text-uppercase"
                to="/products"
                style={{ fontSize: "14px", letterSpacing: "1px" }}
              >
                Cửa Hàng
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link font-weight-medium px-3 text-uppercase"
                to="/blog"
                style={{ fontSize: "14px", letterSpacing: "1px" }}
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link font-weight-medium px-3 text-uppercase"
                to="#"
                style={{ fontSize: "14px", letterSpacing: "1px" }}
              >
                Về Chúng Tôi
              </Link>
            </li>
          </ul>

          {/* Search & User Actions */}
          <div className="d-flex align-items-center">
            <Link to="#" className="text-dark mr-3" title="Tìm kiếm">
              <i className="fa-solid fa-search"></i>
            </Link>
            {isAuthenticated ? (
              <div
                className="dropdown mr-3 user-dropdown-wrapper"
                ref={dropdownRef}
              >
                <button
                  className="btn btn-link text-dark p-0 border-0 user-dropdown-toggle"
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{ textDecoration: "none", boxShadow: "none" }}
                  title={user?.username || "Tài khoản"}
                >
                  <i
                    className="fa-solid fa-circle-user mr-1"
                    style={{ fontSize: "18px", verticalAlign: "middle" }}
                  ></i>
                  <span className="small font-weight-bold text-uppercase d-none d-md-inline">
                    {user?.username}
                  </span>
                  <i
                    className={`fa-solid fa-chevron-down ml-1`}
                    style={{
                      fontSize: "10px",
                      transition: "transform 0.2s",
                      transform: dropdownOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  ></i>
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu dropdown-menu-right rounded-0 border-0 shadow-sm p-0 show user-dropdown-menu">
                    {/* Header */}
                    <div className="px-3 py-3 border-bottom bg-light">
                      <div className="d-flex align-items-center">
                        <i
                          className="fa-solid fa-circle-user mr-2"
                          style={{ fontSize: "28px", color: "#1a1a1a" }}
                        ></i>
                        <div>
                          <p
                            className="mb-0 font-weight-bold text-dark small text-uppercase"
                            style={{ lineHeight: 1.2 }}
                          >
                            {user?.username}
                          </p>
                          <p
                            className="mb-0 text-muted"
                            style={{ fontSize: "11px", letterSpacing: "1px" }}
                          >
                            <i className="fa-solid fa-shield-halved mr-1"></i>
                            USER
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Menu Items */}
                    <Link
                      to="/orders"
                      className="dropdown-item py-2 px-3 small text-uppercase font-weight-medium"
                      style={{ letterSpacing: "1px" }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <i className="fa-solid fa-clipboard-list mr-2"></i>
                      Đơn Hàng Của Tôi
                    </Link>
                    <Link
                      to="/profile"
                      className="dropdown-item py-2 px-3 small text-uppercase font-weight-medium"
                      style={{ letterSpacing: "1px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(false);
                      }}
                    >
                      <i className="fa-solid fa-user-gear mr-2"></i>
                      Thông Tin Tài Khoản
                    </Link>
                    <div className="dropdown-divider m-0" />
                    <button
                      className="dropdown-item py-2 px-3 small text-uppercase font-weight-medium text-danger"
                      onClick={handleLogout}
                      style={{ cursor: "pointer", letterSpacing: "1px" }}
                    >
                      <i className="fa-solid fa-right-from-bracket mr-2"></i>
                      Đăng Xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-dark mr-3" title="Đăng nhập">
                <i className="fa-regular fa-user"></i>
              </Link>
            )}
            <button
              className="btn btn-link text-dark position-relative p-0 border-0"
              title="Giỏ hàng"
              onClick={onCartClick}
              style={{ textDecoration: "none", boxShadow: "none" }}
            >
              <i className="fa-solid fa-bag-shopping"></i>
              {totalItems > 0 && (
                <span
                  className="badge badge-dark badge-pill position-absolute"
                  style={{ top: "-8px", right: "-10px", fontSize: "10px" }}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
