import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OrderSidebar from "../components/OrderSidebar";
import OrderCard from "../components/OrderCard";
import Pagination from "../components/Pagination";
import orderService from "../services/orderService";

// Số đơn hàng mỗi trang
const ITEMS_PER_PAGE = 5;

// ─── Các bộ lọc ───────────────────────────────────────────────────
const FILTERS = {
  ALL: { label: "Tất Cả", value: "ALL" },
  LAST_30: { label: "30 Ngày Qua", value: "LAST_30" },
  PENDING: { label: "Đang Xử Lý", value: "PENDING" },
  SHIPPING: { label: "Đang Giao", value: "SHIPPING" },
  DELIVERED: { label: "Đã Giao", value: "DELIVERED" },
};

const OrderHistoryPage = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // ─── State ────────────────────────────────────────────────────
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(FILTERS.ALL.value);
  const [currentPage, setCurrentPage] = useState(1);

  // ─── Auth check: chưa đăng nhập → chuyển về login ──────────
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // ─── Fetch dữ liệu (chỉ khi đã xác thực) ─────────────────────
  useEffect(() => {
    if (authLoading || !isAuthenticated) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await orderService.getMyOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi khi tải danh sách đơn hàng:", err);
        setError("Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, authLoading]);

  // ─── Lọc đơn hàng ─────────────────────────────────────────────
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    switch (activeFilter) {
      case FILTERS.LAST_30.value:
        result = result.filter((o) => new Date(o.orderDate) >= thirtyDaysAgo);
        break;
      case FILTERS.PENDING.value:
        result = result.filter((o) => o.status === 0);
        break;
      case FILTERS.SHIPPING.value:
        result = result.filter((o) => o.status === 1);
        break;
      case FILTERS.DELIVERED.value:
        result = result.filter((o) => o.status === 2);
        break;
      default:
        break;
    }

    return result;
  }, [orders, activeFilter]);

  // ─── Phân trang ────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset trang khi thay đổi bộ lọc
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // ─── Tính tổng số đơn ─────────────────────────────────────────
  const totalOrders = orders.length;

  // ─── Auth guard: loading / chưa đăng nhập ────────────────────
  if (authLoading) {
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

  if (!isAuthenticated) {
    return null;
  }

  // ─── Render ────────────────────────────────────────────────────
  return (
    <main className="flex-grow-1">
      <div className="container py-5">
        <div className="row">
          {/* ─── Sidebar ──────────────────────────────────────── */}
          <div className="col-12 col-md-3 col-lg-2 mb-4 mb-md-0">
            <OrderSidebar />
          </div>

          {/* ─── Nội dung chính ───────────────────────────────── */}
          <div className="col-12 col-md-9 col-lg-10">
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 pb-3 border-bottom">
              <div>
                <small
                  className="d-block text-uppercase mb-2"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "2px",
                    color: "#775a19",
                    fontWeight: "600",
                  }}
                >
                  Bảng Điều Khiển
                </small>
                <h1
                  className="mb-0 font-weight-bold text-uppercase"
                  style={{
                    fontSize: "28px",
                    letterSpacing: "-1px",
                  }}
                >
                  Lịch Sử Đơn Hàng
                </h1>
              </div>
              <div
                className="mt-3 mt-md-0 d-flex align-items-center"
                style={{ gap: "16px" }}
              >
                <span
                  className="text-uppercase"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1px",
                    color: "#74777f",
                    fontWeight: "500",
                  }}
                >
                  TỔNG GIAO DỊCH: {String(totalOrders).padStart(2, "0")}
                </span>
                <button
                  className="btn text-uppercase"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "2px",
                    fontWeight: "600",
                    borderRadius: "0",
                    padding: "8px 20px",
                    color: "#fff",
                    backgroundColor: "#000",
                    border: "1px solid #000",
                  }}
                >
                  <i className="fa-solid fa-download mr-2"></i>
                  Tải Tất Cả Hóa Đơn
                </button>
              </div>
            </div>

            {/* Bộ lọc */}
            <div className="d-flex flex-wrap mb-4" style={{ gap: "8px" }}>
              {Object.values(FILTERS).map((filter) => (
                <button
                  key={filter.value}
                  className="btn text-uppercase"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1px",
                    fontWeight: activeFilter === filter.value ? "700" : "500",
                    borderRadius: "0",
                    padding: "6px 16px",
                    color: activeFilter === filter.value ? "#fff" : "#44474e",
                    backgroundColor:
                      activeFilter === filter.value ? "#000" : "transparent",
                    border:
                      activeFilter === filter.value
                        ? "1px solid #000"
                        : "1px solid #c4c6cf",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* ─── Loading State ──────────────────────────────── */}
            {loading && (
              <div className="text-center py-5">
                <div
                  className="spinner-border"
                  role="status"
                  style={{ color: "#000" }}
                >
                  <span className="sr-only">Đang tải...</span>
                </div>
                <p className="mt-3 text-muted">
                  Đang tải danh sách đơn hàng...
                </p>
              </div>
            )}

            {/* ─── Error State ────────────────────────────────── */}
            {!loading && error && (
              <div className="text-center py-5">
                <i
                  className="fa-solid fa-circle-exclamation d-block mb-3"
                  style={{ fontSize: "48px", color: "#c4c6cf" }}
                ></i>
                <h5 className="font-weight-bold text-uppercase mb-2">
                  Lỗi Tải Dữ Liệu
                </h5>
                <p className="text-muted">{error}</p>
                <button
                  className="btn text-uppercase mt-2"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "2px",
                    fontWeight: "600",
                    borderRadius: "0",
                    padding: "10px 24px",
                    color: "#fff",
                    backgroundColor: "#000",
                    border: "none",
                  }}
                  onClick={() => window.location.reload()}
                >
                  Thử Lại
                </button>
              </div>
            )}

            {/* ─── Empty State ────────────────────────────────── */}
            {!loading && !error && filteredOrders.length === 0 && (
              <div className="text-center py-5 my-5">
                <i
                  className="fa-solid fa-box-open d-block mb-3"
                  style={{ fontSize: "56px", color: "#c4c6cf" }}
                ></i>
                <h5
                  className="text-uppercase font-weight-bold mb-2"
                  style={{ letterSpacing: "1px" }}
                >
                  Chưa Có Đơn Hàng Nào
                </h5>
                <p className="text-muted mb-4">
                  {activeFilter !== FILTERS.ALL.value
                    ? "Không tìm thấy đơn hàng phù hợp với bộ lọc."
                    : "Bạn chưa có đơn hàng nào. Hãy khám phá sản phẩm của chúng tôi!"}
                </p>
                {activeFilter !== FILTERS.ALL.value ? (
                  <button
                    className="btn text-uppercase"
                    style={{
                      fontSize: "12px",
                      letterSpacing: "2px",
                      fontWeight: "600",
                      borderRadius: "0",
                      padding: "10px 24px",
                      color: "#fff",
                      backgroundColor: "#000",
                      border: "none",
                    }}
                    onClick={() => setActiveFilter(FILTERS.ALL.value)}
                  >
                    Xem Tất Cả
                  </button>
                ) : (
                  <a
                    href="/products"
                    className="btn text-uppercase"
                    style={{
                      fontSize: "12px",
                      letterSpacing: "2px",
                      fontWeight: "600",
                      borderRadius: "0",
                      padding: "10px 24px",
                      color: "#fff",
                      backgroundColor: "#000",
                      border: "none",
                    }}
                  >
                    Mua Sắm Ngay
                  </a>
                )}
              </div>
            )}

            {/* ─── Danh sách đơn hàng ─────────────────────────── */}
            {!loading && !error && filteredOrders.length > 0 && (
              <>
                <div>
                  {paginatedOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>

                {/* Phân trang */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderHistoryPage;
