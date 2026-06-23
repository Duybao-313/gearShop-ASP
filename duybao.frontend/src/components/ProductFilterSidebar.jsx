import React from "react";

const ProductFilterSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  brands,
  selectedBrands,
  onBrandToggle,
  priceRange,
  onPriceChange,
  onClearAll,
}) => {
  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    selectedBrands.length +
    (priceRange[1] < 5000000 ? 1 : 0);

  return (
    <aside className="pr-lg-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h6
          className="font-weight-bold text-dark text-uppercase mb-0"
          style={{ letterSpacing: "1px", fontSize: "13px" }}
        >
          <i className="fa-solid fa-sliders mr-2"></i>Bộ Lọc
        </h6>
        {activeFilterCount > 0 && (
          <button
            className="btn btn-link btn-sm text-danger p-0"
            style={{ fontSize: "11px", textDecoration: "none" }}
            onClick={onClearAll}
          >
            XÓA TẤT CẢ
          </button>
        )}
      </div>

      {/* Filter: Danh mục sản phẩm */}
      <section className="mb-4">
        <h6
          className="font-weight-bold text-uppercase mb-3 pb-2 border-bottom"
          style={{ letterSpacing: "2px", fontSize: "11px" }}
        >
          DANH MỤC
        </h6>
        <div className="d-flex flex-column" style={{ gap: "10px" }}>
          <label
            className={`d-flex align-items-center cursor-pointer mb-0 ${!selectedCategory ? "font-weight-bold text-dark" : "text-muted"}`}
            style={{ cursor: "pointer", fontSize: "14px" }}
          >
            <input
              type="radio"
              name="category"
              className="mr-2"
              checked={!selectedCategory}
              onChange={() => onCategoryChange(null)}
            />
            Tất cả
          </label>
          {categories.map((cat) => (
            <label
              key={cat.id}
              className={`d-flex align-items-center cursor-pointer mb-0 ${selectedCategory === cat.id ? "font-weight-bold text-dark" : "text-muted"}`}
              style={{ cursor: "pointer", fontSize: "14px" }}
            >
              <input
                type="radio"
                name="category"
                className="mr-2"
                checked={selectedCategory === cat.id}
                onChange={() => onCategoryChange(cat.id)}
              />
              {cat.name}
            </label>
          ))}
        </div>
      </section>

      {/* Filter: Thương hiệu */}
      <section className="mb-4">
        <h6
          className="font-weight-bold text-uppercase mb-3 pb-2 border-bottom"
          style={{ letterSpacing: "2px", fontSize: "11px" }}
        >
          THƯƠNG HIỆU
        </h6>
        <div className="d-flex flex-column" style={{ gap: "10px" }}>
          {brands.map((brand) => (
            <label
              key={brand}
              className={`d-flex align-items-center cursor-pointer mb-0 ${selectedBrands.includes(brand) ? "font-weight-bold text-dark" : "text-muted"}`}
              style={{ cursor: "pointer", fontSize: "14px" }}
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedBrands.includes(brand)}
                onChange={() => onBrandToggle(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </section>

      {/* Filter: Khoảng giá */}
      <section className="mb-4">
        <h6
          className="font-weight-bold text-uppercase mb-3 pb-2 border-bottom"
          style={{ letterSpacing: "2px", fontSize: "11px" }}
        >
          KHOẢNG GIÁ
        </h6>
        <div className="px-1">
          <input
            type="range"
            className="w-100"
            min="0"
            max="5000000"
            step="100000"
            value={priceRange[1]}
            onChange={(e) =>
              onPriceChange([priceRange[0], Number(e.target.value)])
            }
            style={{ accentColor: "#1a1a1a" }}
          />
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span
            className="text-muted"
            style={{ fontSize: "11px", letterSpacing: "1px" }}
          >
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
              maximumFractionDigits: 0,
            }).format(priceRange[0])}
          </span>
          <span
            className="text-muted"
            style={{ fontSize: "11px", letterSpacing: "1px" }}
          >
            {priceRange[1] >= 5000000
              ? "5.000.000₫+"
              : new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  maximumFractionDigits: 0,
                }).format(priceRange[1])}
          </span>
        </div>
      </section>

      {/* Filter: Loại */}
      <section className="mb-4">
        <h6
          className="font-weight-bold text-uppercase mb-3 pb-2 border-bottom"
          style={{ letterSpacing: "2px", fontSize: "11px" }}
        >
          LOẠI
        </h6>
        <div className="d-flex flex-column" style={{ gap: "10px" }}>
          {["Wireless", "Wired", "Ultralight", "Ergonomic"].map((type) => (
            <label
              key={type}
              className="d-flex align-items-center cursor-pointer mb-0 text-muted"
              style={{ cursor: "pointer", fontSize: "14px" }}
            >
              <input type="checkbox" className="mr-2" />
              {type}
            </label>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default ProductFilterSidebar;
