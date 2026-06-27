import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const NavBar = ({ onCartClick }) => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

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
              <NavLink
                className="nav-link font-weight-medium px-3 text-uppercase"
                to="/orders"
                style={{ fontSize: "14px", letterSpacing: "1px" }}
              >
                Đơn Hàng
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
              <div className="dropdown mr-3">
                <button
                  className="btn btn-link text-dark dropdown-toggle p-0 border-0"
                  type="button"
                  data-toggle="dropdown"
                  style={{ textDecoration: "none", boxShadow: "none" }}
                  title={user?.username || "Tài khoản"}
                >
                  <i className="fa-solid fa-user-check mr-1"></i>
                  <span className="small font-weight-medium">
                    {user?.username}
                  </span>
                </button>
                <div className="dropdown-menu dropdown-menu-right rounded-0 border-0 shadow-sm">
                  <span
                    className="dropdown-item-text small text-muted text-uppercase"
                    style={{ letterSpacing: "1px" }}
                  >
                    Signed in as <strong>{user?.username}</strong>
                  </span>
                  <div className="dropdown-divider" />
                  <button
                    className="dropdown-item"
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fa-solid fa-right-from-bracket mr-2"></i>
                    Đăng Xuất
                  </button>
                </div>
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
