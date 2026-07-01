import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import productService from "../services/productService";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

// ─── Format tiền VND ─────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

// ─── CartPage Component ──────────────────────────────────────────
const CartPage = () => {
  const { items, totalItems } = useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  // Chặn truy cập nếu chưa đăng nhập
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Lấy sản phẩm gợi ý
  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        setLoadingRecs(true);
        const data = await productService.getAllProducts();
        // Lấy ngẫu nhiên 4 sản phẩm làm gợi ý
        const shuffled = (data || []).sort(() => 0.5 - Math.random());
        setRecommended(shuffled.slice(0, 4));
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm gợi ý:", err);
      } finally {
        setLoadingRecs(false);
      }
    };
    fetchRecommended();
  }, []);

  // ─── Empty Cart ──────────────────────────────────────────────
  if (authLoading || !isAuthenticated) return null;

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
              Giỏ Hàng
            </h1>
            <div
              style={{ width: "80px", height: "3px", backgroundColor: "#000" }}
            ></div>
          </div>

          {/* Empty State */}
          <div className="text-center py-5 my-5">
            <i
              className="fa-solid fa-bag-shopping d-block mb-3"
              style={{ fontSize: "64px", color: "#c4c6cf" }}
            ></i>
            <h5
              className="text-uppercase font-weight-bold mb-2"
              style={{ letterSpacing: "1px" }}
            >
              Giỏ hàng trống
            </h5>
            <p className="text-muted mb-4">
              Có vẻ bạn chưa thêm sản phẩm nào vào giỏ hàng.
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
              <i className="fa-solid fa-arrow-left mr-2"></i>Tiếp Tục Mua Sắm
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ─── Cart With Items ─────────────────────────────────────────
  return (
    <main className="flex-grow-1">
      <div className="container py-5">
        {/* Page Title */}
        <div className="mb-4">
          <h1
            className="display-4 font-weight-bold text-uppercase"
            style={{ letterSpacing: "-1px" }}
          >
            Giỏ Hàng
          </h1>
          <div
            style={{ width: "80px", height: "3px", backgroundColor: "#000" }}
          ></div>
          <p className="text-muted mt-2" style={{ fontSize: "14px" }}>
            {totalItems} sản phẩm trong giỏ hàng của bạn
          </p>
        </div>

        {/* Cart Content: Items + Summary */}
        <div className="row">
          {/* ===== LEFT: Cart Items ===== */}
          <div className="col-12 col-lg-8">
            {/* Table Header (Desktop) */}
            <div
              className="d-none d-md-flex border-top border-bottom py-3 mb-0 text-uppercase text-muted"
              style={{
                fontSize: "11px",
                letterSpacing: "1px",
                fontWeight: 600,
              }}
            >
              <div className="col-6 px-0">Sản Phẩm</div>
              <div className="col-2 text-center px-0">Đơn Giá</div>
              <div className="col-2 text-center px-0">Số Lượng</div>
              <div className="col-2 text-right px-0">Thành Tiền</div>
            </div>

            {/* Cart Items */}
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Continue Shopping Link */}
            <div className="mt-4">
              <Link
                to="/products"
                className="text-uppercase font-weight-bold"
                style={{
                  fontSize: "12px",
                  letterSpacing: "1px",
                  color: "#000",
                  textDecoration: "none",
                  borderBottom: "2px solid #000",
                  paddingBottom: "2px",
                }}
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>Tiếp Tục Mua Sắm
              </Link>
            </div>
          </div>

          {/* ===== RIGHT: Order Summary ===== */}
          <div className="col-12 col-lg-4 mt-4 mt-lg-0">
            <CartSummary />
          </div>
        </div>

        {/* ===== Recommended Add-ons ===== */}
        {!loadingRecs && recommended.length > 0 && (
          <section className="mt-5 pt-4 border-top">
            <div className="d-flex justify-content-between align-items-end mb-3">
              <h3
                className="font-weight-bold text-uppercase mb-0"
                style={{ fontSize: "24px", letterSpacing: "-0.5px" }}
              >
                Có Thể Bạn Cũng Thích
              </h3>
              <span
                className="text-muted text-uppercase"
                style={{ fontSize: "11px", letterSpacing: "1px" }}
              >
                Phụ Kiện Tối Ưu
              </span>
            </div>

            <div className="row row-cols-2 row-cols-md-4">
              {recommended.map((product) => (
                <div className="col mb-3" key={product.id}>
                  <Link
                    to={`/products/${product.id}`}
                    className="text-decoration-none"
                    style={{ color: "inherit" }}
                  >
                    <div className="card border h-100 product-gear-card">
                      <div
                        className="product-gear-img-wrapper bg-light d-flex align-items-center justify-content-center"
                        style={{ height: "200px", overflow: "hidden" }}
                      >
                        <img
                          src={
                            product.imageUrl ||
                            "https://placehold.co/400x400/1a1a1a/666?text=GEAR"
                          }
                          alt={product.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </div>
                      <div className="card-body p-3">
                        <span
                          className="badge badge-light text-uppercase mb-1"
                          style={{ fontSize: "9px", letterSpacing: "1px" }}
                        >
                          {product.brand || "GEAR TECH"}
                        </span>
                        <h6
                          className="font-weight-bold text-uppercase mb-2"
                          style={{ fontSize: "13px", lineHeight: 1.3 }}
                        >
                          {product.name}
                        </h6>
                        <span
                          className="font-weight-bold"
                          style={{ fontSize: "15px" }}
                        >
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default CartPage;
