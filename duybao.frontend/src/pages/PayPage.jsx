import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import orderService from "../services/orderService";
import OrderReview from "../components/OrderReview";
import CheckoutForm from "../components/CheckoutForm";

// ─── Format tiền VND ─────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

// ─── Trạng thái form ban đầu ─────────────────────────────────────
const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
};

/**
 * PayPage — Trang Thanh Toán / Đặt Hàng
 *
 * Luồng xử lý:
 * 1. Hiển thị danh sách sản phẩm từ giỏ hàng (OrderReview)
 * 2. Form thu thập thông tin khách hàng (CheckoutForm)
 * 3. Validate + Gửi đơn hàng lên Backend API
 * 4. Hiển thị kết quả thành công / lỗi
 */
const PayPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  // ─── State ────────────────────────────────────────────────────
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null); // { orderId, message }

  // ─── Handlers ─────────────────────────────────────────────────
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Xóa lỗi của field khi người dùng sửa
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  /** Validate form trước khi gửi */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{7,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ giao hàng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Gửi đơn hàng */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset trạng thái
    setSubmitError(null);
    setOrderSuccess(null);

    // Validate
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Kiểm tra giỏ hàng còn hàng không
    if (items.length === 0) {
      setSubmitError("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm.");
      return;
    }

    setSubmitting(true);

    try {
      // Tính tổng tiền đã bao gồm VAT 8%
      const shipping = 0;
      const taxRate = 0.08;
      const tax = totalPrice * taxRate;
      const grandTotal = totalPrice + shipping + tax;

      // Gửi đơn hàng lên Backend
      // - items: danh sách sản phẩm (lưu vào bảng OrderDetails)
      // - notes: thông tin khách hàng + ghi chú (để admin xử lý)
      // - customerId: 0 nếu chưa login, backend sẽ tự lấy từ cookie nếu đã login
      const orderData = {
        customerId: 0,
        totalAmount: grandTotal,
        notes: JSON.stringify({
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerAddress: formData.address,
          userNote: formData.notes || null,
        }),
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const result = await orderService.createOrder(orderData);

      // Thành công
      setOrderSuccess({
        orderId: result.orderId,
        message: result.message || "Đặt hàng thành công!",
      });

      // Xóa giỏ hàng sau khi đặt thành công
      clearCart();

      // Cuộn lên đầu để xem thông báo
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Lỗi khi đặt hàng:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.";
      setSubmitError(errorMsg);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Render: Đặt hàng thành công ──────────────────────────────
  if (orderSuccess) {
    return (
      <main className="flex-grow-1">
        <div className="container py-5">
          {/* Page Title */}
          <div className="mb-4">
            <h1
              className="display-4 font-weight-bold text-uppercase"
              style={{ letterSpacing: "-1px" }}
            >
              Đặt Hàng
            </h1>
            <div
              style={{ width: "80px", height: "3px", backgroundColor: "#000" }}
            ></div>
          </div>

          {/* Success Box */}
          <div className="text-center py-5 my-5">
            <i
              className="fa-solid fa-circle-check d-block mb-4"
              style={{ fontSize: "72px", color: "#28a745" }}
            ></i>
            <h3
              className="font-weight-bold text-uppercase mb-2"
              style={{ letterSpacing: "1px" }}
            >
              {orderSuccess.message}
            </h3>
            <p className="text-muted mb-1" style={{ fontSize: "15px" }}>
              Mã đơn hàng của bạn:{" "}
              <span
                className="font-weight-bold text-dark"
                style={{ letterSpacing: "1px" }}
              >
                #{orderSuccess.orderId}
              </span>
            </p>
            <p className="text-muted mb-4" style={{ fontSize: "13px" }}>
              Chúng tôi sẽ liên hệ qua <strong>{formData.email}</strong> hoặc{" "}
              <strong>{formData.phone}</strong> để xác nhận đơn hàng.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link
                to="/products"
                className="btn btn-dark btn-lg text-uppercase px-4"
                style={{
                  letterSpacing: "2px",
                  fontSize: "12px",
                  borderRadius: 0,
                }}
              >
                <i className="fa-solid fa-bag-shopping mr-2"></i>Tiếp Tục Mua
                Sắm
              </Link>
              <Link
                to="/"
                className="btn btn-outline-dark btn-lg text-uppercase px-4"
                style={{
                  letterSpacing: "2px",
                  fontSize: "12px",
                  borderRadius: 0,
                }}
              >
                <i className="fa-solid fa-house mr-2"></i>Về Trang Chủ
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─── Render: Giỏ hàng trống ──────────────────────────────────
  if (items.length === 0) {
    return (
      <main className="flex-grow-1">
        <div className="container py-5">
          {/* Page Title */}
          <div className="mb-4">
            <h1
              className="display-4 font-weight-bold text-uppercase"
              style={{ letterSpacing: "-1px" }}
            >
              Đặt Hàng
            </h1>
            <div
              style={{ width: "80px", height: "3px", backgroundColor: "#000" }}
            ></div>
          </div>

          {/* Empty State */}
          <div className="text-center py-5 my-5">
            <i
              className="fa-solid fa-cart-shopping d-block mb-3"
              style={{ fontSize: "64px", color: "#c4c6cf" }}
            ></i>
            <h5
              className="text-uppercase font-weight-bold mb-2"
              style={{ letterSpacing: "1px" }}
            >
              Giỏ hàng trống
            </h5>
            <p className="text-muted mb-4">
              Bạn cần thêm sản phẩm vào giỏ hàng trước khi đặt hàng.
            </p>
            <Link
              to="/products"
              className="btn btn-dark btn-lg text-uppercase px-5"
              style={{
                letterSpacing: "2px",
                fontSize: "13px",
                borderRadius: 0,
              }}
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>Xem Sản Phẩm
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ─── Render: Form thanh toán chính ────────────────────────────
  return (
    <main className="flex-grow-1">
      <div className="container py-5">
        {/* Page Title */}
        <div className="mb-4">
          <h1
            className="display-4 font-weight-bold text-uppercase"
            style={{ letterSpacing: "-1px" }}
          >
            Đặt Hàng
          </h1>
          <div
            style={{ width: "80px", height: "3px", backgroundColor: "#000" }}
          ></div>
          <p className="text-muted mt-2" style={{ fontSize: "14px" }}>
            Vui lòng điền thông tin bên dưới để hoàn tất đơn hàng
          </p>
        </div>

        {/* Error Banner */}
        {submitError && (
          <div
            className="alert alert-danger rounded-0 d-flex align-items-center mb-4"
            role="alert"
            style={{ fontSize: "14px" }}
          >
            <i className="fa-solid fa-circle-exclamation mr-3"></i>
            {submitError}
          </div>
        )}

        {/* Main Content: Form (Left) + Review (Right) */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* ===== LEFT: Thông tin giao hàng ===== */}
            <div className="col-12 col-lg-7 mb-4 mb-lg-0">
              <CheckoutForm
                formData={formData}
                onChange={handleFieldChange}
                errors={errors}
              />
            </div>

            {/* ===== RIGHT: Kiểm tra đơn hàng + Đặt hàng ===== */}
            <div className="col-12 col-lg-5">
              <div className="sticky-top" style={{ top: "100px" }}>
                <OrderReview />

                {/* Nút Đặt Hàng */}
                <button
                  type="submit"
                  className="btn btn-dark btn-block text-uppercase py-3 mt-3"
                  disabled={submitting}
                  style={{
                    letterSpacing: "2px",
                    fontSize: "13px",
                    fontWeight: 600,
                    borderRadius: 0,
                  }}
                >
                  {submitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm mr-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Đang Xử Lý...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-check mr-2"></i>Xác Nhận Đặt
                      Hàng
                    </>
                  )}
                </button>

                <p
                  className="text-center text-muted mt-2 mb-0"
                  style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                >
                  Đơn hàng được xử lý bảo mật
                </p>

                {/* Back to Cart Link */}
                <div className="text-center mt-3">
                  <Link
                    to="/cart"
                    className="text-uppercase font-weight-bold"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "1px",
                      color: "#6c757d",
                      textDecoration: "none",
                      borderBottom: "1px solid #6c757d",
                      paddingBottom: "2px",
                    }}
                  >
                    <i className="fa-solid fa-arrow-left mr-1"></i>Quay Lại Giỏ
                    Hàng
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PayPage;
