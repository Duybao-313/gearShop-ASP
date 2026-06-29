import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfileSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Xác định tier dựa trên role
  const tier =
    user && user.role === "Admin"
      ? "ADMIN"
      : user && user.role === "Editor"
        ? "EDITOR"
        : "ELITE";

  return (
    <aside className="profile-sidebar">
      {/* User Avatar & Info */}
      <div className="profile-sidebar-header">
        <div className="profile-avatar">
          <i className="fa-solid fa-user"></i>
        </div>
        <div>
          <h3 className="profile-sidebar-name">
            {user?.fullName || user?.username || "Tài Khoản"}
          </h3>
          <p className="profile-sidebar-tier">{tier} TIER MEMBER</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="profile-sidebar-nav">
        <NavLink
          to="/account"
          end
          className={({ isActive }) =>
            `profile-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <i className="fa-solid fa-user"></i>
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `profile-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <i className="fa-solid fa-box"></i>
          <span>Đơn Hàng</span>
        </NavLink>

        <NavLink
          to="/account/addresses"
          className={({ isActive }) =>
            `profile-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <i className="fa-solid fa-location-dot"></i>
          <span>Địa Chỉ</span>
        </NavLink>
      </nav>

      {/* Bottom Actions */}
      <div className="profile-sidebar-footer">
        <NavLink to="/account/settings" className="profile-sidebar-link">
          <i className="fa-solid fa-gear"></i>
          <span>Cài Đặt</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="profile-sidebar-link profile-sidebar-logout"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Đăng Xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
