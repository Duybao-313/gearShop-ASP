import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

/**
 * RelatedProducts - Hiển thị sản phẩm liên quan / cùng danh mục
 * @param {Object[]} products - Mảng sản phẩm cùng danh mục
 * @param {number} currentProductId - ID sản phẩm hiện tại (để loại trừ)
 * @param {string} categoryName - Tên danh mục
 */
const RelatedProducts = ({ products = [], currentProductId, categoryName }) => {
  // Lọc các sản phẩm cùng danh mục, loại trừ sản phẩm hiện tại
  const related = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="related-products mt-5 pt-4 border-top">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="font-weight-bold text-uppercase text-dark mb-0"
            style={{ letterSpacing: "-0.5px" }}>
            {categoryName ? `Thêm ${categoryName}` : "Sản Phẩm Liên Quan"}
          </h4>
          <p className="text-muted small mb-0 mt-1">Hoàn thiện bộ setup của bạn</p>
        </div>
        <Link
          to="/products"
          className="btn btn-outline-dark btn-sm text-uppercase"
          style={{ letterSpacing: "1px", fontSize: "11px" }}
        >
          Xem Tất Cả <i className="fa-solid fa-arrow-right ml-1"></i>
        </Link>
      </div>

      <div className="row">
        {related.map((product) => (
          <div key={product.id} className="col-6 col-md-3 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
