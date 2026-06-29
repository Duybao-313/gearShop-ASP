import React from "react";
import { useAuth } from "../context/AuthContext";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileForm from "../components/ProfileForm";
import ActivityOverview from "../components/ActivityOverview";

const InformationPage = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex-grow-1">
        <div className="container py-5">
          <div className="text-center py-5 my-5">
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-3 text-muted">
              Đang kiểm tra trạng thái đăng nhập...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex-grow-1">
        <div className="container py-5">
          <div className="text-center py-5 my-5">
            <i
              className="fa-solid fa-lock d-block mb-3"
              style={{ fontSize: "64px", color: "#c4c6cf" }}
            ></i>
            <h5
              className="text-uppercase font-weight-bold mb-2"
              style={{ letterSpacing: "1px" }}
            >
              Yêu Cầu Đăng Nhập
            </h5>
            <p className="text-muted mb-4">
              Vui lòng đăng nhập để xem và quản lý thông tin tài khoản.
            </p>
            <a
              href="/login"
              className="btn btn-dark btn-lg text-uppercase px-5"
              style={{
                letterSpacing: "2px",
                fontSize: "13px",
                borderRadius: 0,
              }}
            >
              <i className="fa-solid fa-right-to-bracket mr-2"></i>Đăng Nhập
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow-1">
      <div className="profile-page-container">
        <ProfileSidebar />
        <div className="profile-page-main">
          <div className="profile-page-content">
            <ProfileForm />
            <ActivityOverview />
          </div>
        </div>
      </div>
    </main>
  );
};

export default InformationPage;
