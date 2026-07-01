import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productService from "../services/productService";
import blogService from "../services/blogService";
import categoryProductService from "../services/categoryProductService";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const data = await productService.getAllProducts();
        setFeaturedProducts((data || []).slice(0, 8));
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const data = await blogService.getAllPosts();
        setLatestPosts((data || []).slice(0, 3));
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await categoryProductService.getAllCategoryProducts();
        setCategories(data || []);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };

    fetchProducts();
    fetchPosts();
    fetchCategories();
  }, []);

  const newArrivals = featuredProducts.slice(0, 4);
  const bestSellers = featuredProducts.slice(4, 8);

  const toSlug = (name) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <main>
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="container">
          <div
            className="row align-items-center"
            style={{ minHeight: "500px" }}
          >
            <div className="col-lg-6 py-5">
              <span
                className="badge badge-dark px-3 py-2 mb-3 font-weight-medium text-uppercase"
                style={{ letterSpacing: "2px", fontSize: "11px" }}
              >
                ENGINEERED PRECISION
              </span>
              <h1
                className="display-3 font-weight-bold text-dark mb-3"
                style={{ letterSpacing: "-1px" }}
              >
                PRECISE
                <br />
                PERFORMANCE
              </h1>
              <p
                className="lead text-muted mb-4"
                style={{ maxWidth: "420px", lineHeight: 1.8 }}
              >
                Nâng tầm trải nghiệm gaming với bộ sưu tập phần cứng ultra-low
                latency mới nhất.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link
                  to="/products"
                  className="btn btn-dark btn-lg px-4 mr-2 text-uppercase"
                  style={{ letterSpacing: "1px", fontSize: "13px" }}
                >
                  <i className="fa-solid fa-bag-shopping mr-2"></i>Shop Bộ Sưu
                  Tập
                </Link>
                <a
                  href="#categories"
                  className="btn btn-outline-dark btn-lg px-4 text-uppercase"
                  style={{ letterSpacing: "1px", fontSize: "13px" }}
                >
                  <i className="fa-solid fa-microchip mr-2"></i>Xem Thông Số
                </a>
              </div>
              <div className="d-flex mt-4 pt-3">
                <div className="mr-4 pr-4 border-right">
                  <strong className="text-dark h4 mb-0">50+</strong>
                  <p className="small text-muted mb-0">Sản phẩm</p>
                </div>
                <div className="mr-4 pr-4 border-right">
                  <strong className="text-dark h4 mb-0">4.8★</strong>
                  <p className="small text-muted mb-0">Đánh giá</p>
                </div>
                <div>
                  <strong className="text-dark h4 mb-0">24/7</strong>
                  <p className="small text-muted mb-0">Hỗ trợ</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-center d-none d-lg-block">
              <div className="hero-image-wrapper">
                <div className="hero-circle"></div>
                <i className="fa-solid fa-computer-mouse text-dark hero-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section id="categories" className="border-top border-bottom">
        <div className="container">
          <div className="row no-gutters">
            {categories.map((cat, index) => (
              <Link
                key={cat.id}
                to={"/products?category=" + toSlug(cat.name)}
                className={
                  "col-6 col-md category-card text-center py-4" +
                  (index < categories.length - 1 ? " border-right" : "")
                }
              >
                {cat.imageUrl ? (
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="category-image"
                  />
                ) : (
                  <i className="fa-solid fa-grid-2 category-icon"></i>
                )}
                <span className="d-block mt-2 category-label">
                  {cat.name.toUpperCase()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEW ARRIVALS SECTION ===== */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4 pb-3 border-bottom">
            <div>
              <span
                className="badge badge-dark px-3 py-1 mb-2 text-uppercase"
                style={{ letterSpacing: "2px", fontSize: "10px" }}
              >
                Mới Ra Mắt
              </span>
              <h2 className="font-weight-bold text-dark mb-0">NEW ARRIVALS</h2>
            </div>
            <Link
              to="/products"
              className="text-dark font-weight-bold small text-uppercase"
              style={{
                letterSpacing: "1px",
                borderBottom: "2px solid #000",
                paddingBottom: "2px",
              }}
            >
              XEM TẤT CẢ <i className="fa-solid fa-arrow-right ml-1"></i>
            </Link>
          </div>

          {loadingProducts ? (
            <div className="text-center py-5">
              <div className="spinner-border text-dark" role="status">
                <span className="sr-only">Đang tải...</span>
              </div>
              <p className="text-muted mt-2">Đang tải sản phẩm mới...</p>
            </div>
          ) : (
            <div className="row">
              {newArrivals.length === 0 ? (
                <div className="col-12 text-center py-5 text-muted">
                  <i className="fa-solid fa-box-open fa-3x mb-3 d-block"></i>
                  Chưa có sản phẩm nào.
                </div>
              ) : (
                newArrivals.map((product) => (
                  <div className="col-md-3 mb-4" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="py-4">
        <div className="container">
          <div className="row no-gutters border overflow-hidden">
            <div className="col-lg-8 bg-dark text-white p-5 d-flex flex-column justify-content-center position-relative">
              <div className="promo-grid-overlay"></div>
              <span
                className="badge badge-light text-dark px-3 py-1 mb-3 text-uppercase align-self-start"
                style={{ letterSpacing: "2px", fontSize: "10px" }}
              >
                LIMITED EDITION
              </span>
              <h2
                className="display-4 font-weight-bold mb-3"
                style={{ letterSpacing: "-1px" }}
              >
                GOLD SERIES: PRECISION REFINED
              </h2>
              <p
                className="lead mb-4 text-white-50"
                style={{ maxWidth: "500px" }}
              >
                Phần cứng flagship với điểm nhấn mạ vàng 24k — hiệu năng đỉnh
                cao kết hợp đẳng cấp.
              </p>
              <div>
                <Link
                  to="/products"
                  className="btn btn-light btn-lg px-5 text-uppercase"
                  style={{ letterSpacing: "1px", fontSize: "13px" }}
                >
                  KHÁM PHÁ GOLD SERIES
                </Link>
              </div>
            </div>
            <div
              className="col-lg-4 p-0 d-none d-lg-block"
              style={{ minHeight: "350px", background: "#f5f5f5" }}
            >
              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <i
                  className="fa-solid fa-crown text-warning"
                  style={{ fontSize: "8rem", opacity: 0.6 }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BEST SELLERS SECTION ===== */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4 pb-3 border-bottom">
            <div>
              <span
                className="badge badge-dark px-3 py-1 mb-2 text-uppercase"
                style={{ letterSpacing: "2px", fontSize: "10px" }}
              >
                Yêu Thích Nhất
              </span>
              <h2 className="font-weight-bold text-dark mb-0">BEST SELLERS</h2>
            </div>
            <Link
              to="/products"
              className="text-dark font-weight-bold small text-uppercase"
              style={{
                letterSpacing: "1px",
                borderBottom: "2px solid #000",
                paddingBottom: "2px",
              }}
            >
              SHOP ALL <i className="fa-solid fa-arrow-right ml-1"></i>
            </Link>
          </div>

          {loadingProducts ? (
            <div className="text-center py-5">
              <div className="spinner-border text-dark" role="status">
                <span className="sr-only">Đang tải...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {bestSellers.length === 0 ? (
                <div className="col-12 text-center py-5 text-muted">
                  <i className="fa-solid fa-box-open fa-3x mb-3 d-block"></i>
                  Chưa có sản phẩm bán chạy.
                </div>
              ) : (
                bestSellers.map((product) => (
                  <div className="col-md-3 mb-4" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* ===== LATEST BLOG POSTS ===== */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4 pb-3 border-bottom">
            <div>
              <span
                className="badge badge-dark px-3 py-1 mb-2 text-uppercase"
                style={{ letterSpacing: "2px", fontSize: "10px" }}
              >
                Kiến Thức &amp; Mẹo
              </span>
              <h2 className="font-weight-bold text-dark mb-0">BLOG GAMING</h2>
            </div>
            <Link
              to="/blog"
              className="text-dark font-weight-bold small text-uppercase"
              style={{
                letterSpacing: "1px",
                borderBottom: "2px solid #000",
                paddingBottom: "2px",
              }}
            >
              ĐỌC THÊM <i className="fa-solid fa-arrow-right ml-1"></i>
            </Link>
          </div>

          {loadingPosts ? (
            <div className="text-center py-5">
              <div className="spinner-border text-dark" role="status">
                <span className="sr-only">Đang tải...</span>
              </div>
              <p className="text-muted mt-2">Đang tải bài viết...</p>
            </div>
          ) : (
            <div className="row">
              {latestPosts.length === 0 ? (
                <div className="col-12 text-center py-5 text-muted">
                  <i className="fa-solid fa-newspaper fa-3x mb-3 d-block"></i>
                  Chưa có bài viết nào.
                </div>
              ) : (
                latestPosts.map((post) => (
                  <div className="col-md-4 mb-4" key={post.id}>
                    <div className="card blog-gear-card h-100 border">
                      <div className="blog-gear-img-wrapper">
                        <img
                          src={
                            post.imageUrl ||
                            "https://placehold.co/600x350/1a1a1a/666?text=BLOG"
                          }
                          className="card-img-top"
                          alt={post.title}
                        />
                      </div>
                      <div className="card-body d-flex flex-column p-4">
                        <small
                          className="text-muted text-uppercase mb-2"
                          style={{ fontSize: "10px", letterSpacing: "1px" }}
                        >
                          <i className="fa-regular fa-calendar mr-1"></i>
                          {new Date(post.createdDate).toLocaleDateString(
                            "vi-VN",
                          )}
                          {post.category && <> • {post.category.name}</>}
                        </small>
                        <h5 className="font-weight-bold text-dark mb-2">
                          {post.title}
                        </h5>
                        <p className="card-text text-muted small flex-grow-1">
                          {post.shortDescription ||
                            "Khám phá bài viết chuyên sâu về gaming gear, hướng dẫn build PC và review phụ kiện..."}
                        </p>
                        <Link
                          to={"/blog/" + post.id}
                          className="text-dark font-weight-bold small text-uppercase mt-2"
                          style={{ letterSpacing: "1px" }}
                        >
                          ĐỌC TIẾP{" "}
                          <i className="fa-solid fa-arrow-right ml-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="font-weight-bold mb-3">SYSTEM UPDATES</h2>
              <p className="text-white-50 mb-0" style={{ maxWidth: "450px" }}>
                Đăng ký nhận thông báo sớm về sản phẩm mới, cập nhật firmware và
                insights gaming. Không spam, chỉ performance.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="input-group input-group-lg">
                <input
                  type="email"
                  className="form-control border-0"
                  placeholder="NHẬP EMAIL CỦA BẠN"
                  style={{ letterSpacing: "1px", fontSize: "13px" }}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-light text-dark text-uppercase px-4"
                    style={{ letterSpacing: "1px", fontSize: "13px" }}
                    type="button"
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
