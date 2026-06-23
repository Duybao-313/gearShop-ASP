import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
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
              <NavLink className="nav-link font-weight-medium px-3 text-uppercase" to="/" end
                style={{ fontSize: "14px", letterSpacing: "1px" }}>
                Trang Chủ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link font-weight-medium px-3 text-uppercase" to="/products"
                style={{ fontSize: "14px", letterSpacing: "1px" }}>
                Cửa Hàng
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link font-weight-medium px-3 text-uppercase" to="/blog"
                style={{ fontSize: "14px", letterSpacing: "1px" }}>
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link font-weight-medium px-3 text-uppercase" to="#"
                style={{ fontSize: "14px", letterSpacing: "1px" }}>
                Về Chúng Tôi
              </Link>
            </li>
          </ul>

          {/* Search & User Actions */}
          <div className="d-flex align-items-center">
            <Link to="#" className="text-dark mr-3" title="Tìm kiếm">
              <i className="fa-solid fa-search"></i>
            </Link>
            <Link to="#" className="text-dark mr-3" title="Đăng nhập">
              <i className="fa-regular fa-user"></i>
            </Link>
            <Link
              to="#"
              className="text-dark position-relative"
              title="Giỏ hàng"
            >
              <i className="fa-solid fa-bag-shopping"></i>
              <span
                className="badge badge-dark badge-pill position-absolute"
                style={{ top: "-8px", right: "-10px", fontSize: "10px" }}
              >
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
