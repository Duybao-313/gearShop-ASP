import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import productService from "../services/productService";
import categoryProductService from "../services/categoryProductService";
import ProductFilterSidebar from "../components/ProductFilterSidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 9;

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Dữ liệu API
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  // Bộ lọc
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  // === FETCH DATA ===
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;
        if (searchQuery) {
          data = await productService.searchProducts(searchQuery);
        } else {
          data = await productService.getAllProducts();
        }
        setProducts(data || []);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
        setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await categoryProductService.getAllCategoryProducts();
        setCategories(data || []);
      } catch (err) {
        console.error("Lỗi khi tải danh mục:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [searchQuery]);

  // === GIÁ CAO NHẤT THỰC TẾ TỪ DỮ LIỆU ===
  const maxProductPrice = useMemo(() => {
    if (products.length === 0) return 50000000;
    const max = Math.max(...products.map((p) => p.price));
    // Làm tròn lên bội số 1.000.000 để slider dễ nhìn
    return Math.ceil(max / 1000000) * 1000000;
  }, [products]);

  // === TRÍCH XUẤT DANH SÁCH THƯƠNG HIỆU TỪ DỮ LIỆU ===
  const availableBrands = useMemo(() => {
    const brandSet = new Set();
    products.forEach((p) => {
      const name = (p.name || "").toLowerCase();
      if (name.includes("logitech")) brandSet.add("Logitech");
      if (name.includes("razer")) brandSet.add("Razer");
      if (name.includes("steelseries")) brandSet.add("SteelSeries");
      if (name.includes("corsair")) brandSet.add("Corsair");
      if (name.includes("hyperx")) brandSet.add("HyperX");
      if (name.includes("akko")) brandSet.add("Akko");
      if (name.includes("keychron")) brandSet.add("Keychron");
      if (name.includes("ducky")) brandSet.add("Ducky");
    });
    return [...brandSet].sort();
  }, [products]);

  // === LỌC & SẮP XẾP ===
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Lọc theo danh mục
    if (selectedCategory) {
      result = result.filter((p) => p.categoryProductId === selectedCategory);
    }

    // Lọc theo thương hiệu
    if (selectedBrands.length > 0) {
      result = result.filter((p) => {
        const name = (p.name || "").toLowerCase();
        return selectedBrands.some((brand) =>
          name.includes(brand.toLowerCase()),
        );
      });
    }

    // Lọc theo khoảng giá
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Sắp xếp
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default: // featured
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, selectedCategory, selectedBrands, priceRange, sortBy]);

  // === PHÂN TRANG ===
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );

  // Reset page về 1 khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrands, priceRange, sortBy]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // === HANDLERS ===
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const handleClearAll = () => {
    setSelectedCategory(null);
    setSelectedBrands([]);
    setPriceRange([0, maxProductPrice]);
    setSortBy("featured");
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // === FORMATTERS ===
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <main>
      {/* ===== PAGE HEADER & TOOLBAR ===== */}
      <section className="border-bottom py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
            <div>
              <span
                className="badge badge-dark px-3 py-1 mb-2 text-uppercase"
                style={{ letterSpacing: "2px", fontSize: "10px" }}
              >
                {searchQuery ? "KẾT QUẢ TÌM KIẾM" : "PRECISION INSTRUMENTS"}
              </span>
              <h1
                className="font-weight-bold text-dark mb-0 text-uppercase"
                style={{ fontSize: "42px", letterSpacing: "-1px" }}
              >
                {searchQuery ? `"${searchQuery}"` : "Gaming Gear"}
              </h1>
            </div>

            {/* Sort + Results Count */}
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted" style={{ fontSize: "13px" }}>
                {filteredProducts.length} sản phẩm
              </span>
              <div className="d-flex align-items-center">
                <label
                  className="text-muted text-uppercase mr-2 mb-0"
                  style={{ fontSize: "10px", letterSpacing: "1px" }}
                >
                  Sắp xếp
                </label>
                <select
                  className="form-control form-control-sm border-dark bg-transparent text-dark"
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    borderRadius: 0,
                    cursor: "pointer",
                    minWidth: "160px",
                  }}
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="featured">Nổi bật</option>
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Sidebar Filters */}
            <div className="col-lg-3 mb-4 mb-lg-0">
              {loadingCategories ? (
                <div className="text-center py-3">
                  <div
                    className="spinner-border spinner-border-sm text-dark"
                    role="status"
                  >
                    <span className="sr-only">Đang tải bộ lọc...</span>
                  </div>
                </div>
              ) : (
                <ProductFilterSidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                  brands={availableBrands}
                  selectedBrands={selectedBrands}
                  onBrandToggle={handleBrandToggle}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                  onClearAll={handleClearAll}
                  maxPrice={maxProductPrice}
                />
              )}
            </div>

            {/* Product Grid */}
            <div className="col-lg-9">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-dark" role="status">
                    <span className="sr-only">Đang tải...</span>
                  </div>
                  <p className="text-muted mt-3" style={{ fontSize: "14px" }}>
                    Đang tải danh sách sản phẩm...
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-5">
                  <i className="fa-solid fa-triangle-exclamation fa-3x text-muted mb-3 d-block"></i>
                  <p className="text-muted">{error}</p>
                  <button
                    className="btn btn-outline-dark btn-sm mt-2"
                    onClick={() => window.location.reload()}
                  >
                    <i className="fa-solid fa-rotate mr-1"></i>Thử lại
                  </button>
                </div>
              ) : paginatedProducts.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fa-solid fa-box-open fa-3x text-muted mb-3 d-block"></i>
                  <p
                    className="text-dark font-weight-medium"
                    style={{ fontSize: "16px" }}
                  >
                    Không tìm thấy sản phẩm phù hợp
                  </p>
                  <p className="text-muted" style={{ fontSize: "14px" }}>
                    Thử thay đổi bộ lọc hoặc{" "}
                    <button
                      className="btn btn-link btn-sm p-0 text-dark font-weight-bold"
                      onClick={handleClearAll}
                      style={{ textDecoration: "underline" }}
                    >
                      xóa tất cả bộ lọc
                    </button>
                  </p>
                </div>
              ) : (
                <>
                  <div className="row">
                    {paginatedProducts.map((product) => (
                      <div className="col-md-4 mb-4" key={product.id}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
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
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="bg-dark text-white py-5 mt-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <h3
                className="font-weight-bold text-uppercase mb-2"
                style={{ letterSpacing: "1px", fontSize: "24px" }}
              >
                MIỄN PHÍ VẬN CHUYỂN
              </h3>
              <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                Cho đơn hàng trên {formatPrice(1000000)}. Giao hàng nhanh 2-3
                ngày làm việc.
              </p>
            </div>
            <div className="col-lg-6 text-lg-right">
              <Link
                to="/products"
                className="btn btn-outline-light px-4 text-uppercase"
                style={{ letterSpacing: "1px", fontSize: "12px" }}
              >
                <i className="fa-solid fa-truck-fast mr-2"></i>Mua Ngay
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
