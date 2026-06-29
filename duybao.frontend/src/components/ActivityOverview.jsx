import React, { useState, useEffect } from "react";
import orderService from "../services/orderService";
import { useAuth } from "../context/AuthContext";

const ActivityOverview = () => {
  const { user } = useAuth();
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await orderService.getMyOrders();
        setOrderCount((orders || []).length);
      } catch {
        // Nếu chưa có API hoặc lỗi, để mặc định
        setOrderCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Xác định tier
  const tier =
    user?.role === "Admin"
      ? "ADMIN"
      : user?.role === "Editor"
        ? "EDITOR"
        : "ELITE";

  return (
    <div className="activity-overview">
      {/* Header */}
      <div className="activity-overview-header">
        <i className="fa-solid fa-chart-simple"></i>
        <span className="activity-overview-title">TỔNG QUAN HOẠT ĐỘNG</span>
      </div>

      {/* Stats Grid */}
      <div className="row text-center">
        <div className="col-6 col-md-3 mb-3 mb-md-0">
          <p className="activity-stat-label">ĐƠN HÀNG</p>
          <p className="activity-stat-value">
            {loading ? (
              <span
                className="spinner-border spinner-border-sm text-dark"
                role="status"
              ></span>
            ) : (
              orderCount
            )}
          </p>
        </div>
        <div className="col-6 col-md-3 mb-3 mb-md-0">
          <p className="activity-stat-label">HẠNG THÀNH VIÊN</p>
          <p className="activity-stat-tier">{tier}</p>
        </div>
        <div className="col-6 col-md-3 mb-3 mb-md-0">
          <p className="activity-stat-label">TÍCH LŨY</p>
          <p className="activity-stat-value">4.5M</p>
        </div>
        <div className="col-6 col-md-3">
          <p className="activity-stat-label">ƯU ĐÃI</p>
          <p className="activity-stat-tier">15%</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityOverview;
