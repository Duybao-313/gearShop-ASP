import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OrderStatusBadge from "../components/OrderStatusBadge";
import OrderDetailProductItem from "../components/OrderDetailProductItem";
import OrderDetailSummary from "../components/OrderDetailSummary";
import OrderDetailInfoCard from "../components/OrderDetailInfoCard";
import orderService from "../services/orderService";

const formatFullDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getEstimatedDelivery = (orderDate) => {
  if (!orderDate) return "Đang cập nhật";
  const start = new Date(orderDate);
  start.setDate(start.getDate() + 3);
  const end = new Date(orderDate);
  end.setDate(end.getDate() + 5);
  return `${start.getDate()} - ${end.getDate()} Tháng ${end.getMonth() + 1}, ${end.getFullYear()}`;
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate("/login", { replace: true });
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (authLoading || !isAuthenticated || !id) return;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await orderService.getMyOrderDetail(id);
        setOrder(data);
      } catch (err) {
        console.error("Lỗi tải chi tiết đơn hàng:", err);
        setError(
          err.response?.status === 404
            ? "Không tìm thấy đơn hàng."
            : err.response?.status === 401
              ? "Vui lòng đăng nhập."
              : "Không thể tải chi tiết đơn hàng.",
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isAuthenticated, authLoading]);

  if (authLoading || loading) {
    return (
      <main className="flex-grow-1">
        <div className="container py-5 text-center">
          <div
            className="spinner-border"
            role="status"
            style={{ color: "#000" }}
          >
            <span className="sr-only">Đang tải...</span>
          </div>
        </div>
      </main>
    );
  }
  if (!isAuthenticated) return null;

  if (error || !order) {
    return (
      <main className="flex-grow-1">
        <div className="container py-5 text-center">
          <i
            className="fa-solid fa-circle-exclamation d-block mb-3"
            style={{ fontSize: "48px", color: "#ba1a1a" }}
          ></i>
          <h3 className="font-weight-bold text-uppercase mb-2">Lỗi</h3>
          <p className="text-muted mb-4">
            {error || "Không tìm thấy đơn hàng."}
          </p>
          <Link
            to="/orders"
            className="btn btn-dark text-uppercase px-4"
            style={{
              borderRadius: "0",
              letterSpacing: "1px",
              fontSize: "12px",
            }}
          >
            Quay lại Lịch Sử Đơn Hàng
          </Link>
        </div>
      </main>
    );
  }

  const subtotal =
    order.orderDetails?.reduce(
      (s, d) => s + (d.unitPrice || 0) * (d.quantity || 0),
      0,
    ) || 0;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;
  const totalItems =
    order.orderDetails?.reduce((s, d) => s + (d.quantity || 0), 0) || 0;

  let cInfo = {
    customerName: null,
    customerEmail: null,
    customerPhone: null,
    customerAddress: null,
  };
  if (order.notes) {
    try {
      cInfo = { ...cInfo, ...JSON.parse(order.notes) };
    } catch {}
  }

  return (
    <main className="flex-grow-1" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="container py-5">
        <div className="mb-5">
          <div
            className="d-flex align-items-center mb-3"
            style={{ gap: "16px" }}
          >
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#16a34a",
              }}
            >
              <i
                className="fa-solid fa-check"
                style={{ color: "#fff", fontSize: "20px" }}
              ></i>
            </div>
            <h1
              className="mb-0 font-weight-bold text-uppercase"
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                letterSpacing: "-1px",
              }}
            >
              Chi Tiết Đơn Hàng #{String(order.id).padStart(5, "0")}
            </h1>
          </div>
          <p
            className="text-muted mb-0"
            style={{ fontSize: "15px", maxWidth: "640px" }}
          >
            Cảm ơn bạn đã tin tưởng GEAR TECH. Dưới đây là thông tin chi tiết
            đơn hàng của bạn.
          </p>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8">
            <div
              className="bg-white border p-4 mb-4"
              style={{ borderColor: "#e2e2e2" }}
            >
              <div className="row">
                {[
                  ["MÃ ĐƠN HÀNG", `#${String(order.id).padStart(5, "0")}`],
                  ["NGÀY ĐẶT", formatFullDate(order.orderDate)],
                ].map(([label, value], i) => (
                  <div key={i} className="col-6 col-md-3 mb-3 mb-md-0">
                    <small
                      className="d-block text-uppercase mb-1"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "2px",
                        color: "#74777f",
                        fontWeight: "600",
                      }}
                    >
                      {label}
                    </small>
                    <span
                      className="font-weight-bold"
                      style={{ fontSize: "16px" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
                <div className="col-6 col-md-3 mb-3 mb-md-0">
                  <small
                    className="d-block text-uppercase mb-1"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "2px",
                      color: "#74777f",
                      fontWeight: "600",
                    }}
                  >
                    TRẠNG THÁI
                  </small>
                  <OrderStatusBadge status={order.status} dateLabel={null} />
                </div>
                <div className="col-6 col-md-3">
                  <small
                    className="d-block text-uppercase mb-1"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "2px",
                      color: "#74777f",
                      fontWeight: "600",
                    }}
                  >
                    DỰ KIẾN GIAO
                  </small>
                  <span
                    className="font-weight-bold"
                    style={{ fontSize: "14px" }}
                  >
                    {getEstimatedDelivery(order.orderDate)}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="bg-white border mb-4"
              style={{ borderColor: "#e2e2e2" }}
            >
              <div
                className="px-4 py-3"
                style={{
                  backgroundColor: "#f3f3f3",
                  borderBottom: "1px solid #e2e2e2",
                }}
              >
                <span
                  className="text-uppercase font-weight-bold"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "2px",
                    color: "#000",
                  }}
                >
                  DANH SÁCH SẢN PHẨM ({totalItems} sản phẩm)
                </span>
              </div>
              {order.orderDetails?.map((detail, idx) => (
                <OrderDetailProductItem
                  key={detail.id || idx}
                  detail={detail}
                  isLast={idx === order.orderDetails.length - 1}
                />
              ))}
            </div>

            <div className="row mb-4">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <OrderDetailInfoCard
                  icon="fa-solid fa-truck-fast"
                  title="THÔNG TIN GIAO HÀNG"
                  name={cInfo.customerName || order.customer?.fullName || "N/A"}
                  lines={[
                    cInfo.customerAddress || order.customer?.address || "",
                    cInfo.customerPhone || order.customer?.phone || "",
                  ]}
                  badge="GIAO HÀNG TIÊU CHUẨN"
                />
              </div>
              <div className="col-12 col-md-6">
                <OrderDetailInfoCard
                  icon="fa-solid fa-credit-card"
                  title="THANH TOÁN"
                  name="Thanh toán khi nhận hàng"
                  lines={[
                    cInfo.customerEmail || order.customer?.email || "",
                    "Trạng thái: Chưa thanh toán",
                  ]}
                  badge="COD"
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <OrderDetailSummary
              subtotal={subtotal}
              shipping={0}
              tax={tax}
              grandTotal={grandTotal}
              itemCount={totalItems}
            />

            <div className="mt-4">
              <Link
                to="/orders"
                className="btn btn-dark btn-block text-uppercase py-3 mb-3"
                style={{
                  borderRadius: "0",
                  letterSpacing: "2px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                <i className="fa-solid fa-list-ul mr-2"></i>Lịch Sử Đơn Hàng
              </Link>
              <Link
                to="/products"
                className="btn btn-outline-dark btn-block text-uppercase py-3"
                style={{
                  borderRadius: "0",
                  letterSpacing: "2px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                Tiếp Tục Mua Sắm<i className="fa-solid fa-arrow-right ml-2"></i>
              </Link>
            </div>

            <div
              className="mt-4 p-4"
              style={{
                backgroundColor: "rgba(119,90,25,0.06)",
                border: "1px solid rgba(119,90,25,0.2)",
              }}
            >
              <div className="d-flex" style={{ gap: "12px" }}>
                <i
                  className="fa-solid fa-headset mt-1"
                  style={{ color: "#775a19", fontSize: "24px" }}
                ></i>
                <div>
                  <h4
                    className="font-weight-bold text-uppercase mb-1"
                    style={{
                      fontSize: "14px",
                      color: "#775a19",
                      letterSpacing: "1px",
                    }}
                  >
                    Hỗ trợ kỹ thuật 24/7
                  </h4>
                  <p className="text-muted mb-2" style={{ fontSize: "13px" }}>
                    Bạn cần thay đổi thông tin đơn hàng hoặc hỗ trợ? Liên hệ
                    hotline.
                  </p>
                  <a
                    href="tel:19001008"
                    className="font-weight-bold text-uppercase"
                    style={{
                      fontSize: "13px",
                      color: "#775a19",
                      textDecoration: "underline",
                    }}
                  >
                    1900-GEAR-TECH
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetailPage;
