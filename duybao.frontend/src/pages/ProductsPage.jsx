import React from "react";
import CategoryProductList from "../components/CategoryProductList";
import ProductList from "../components/ProductList";

const ProductsPage = () => {
  return (
    <main className="py-4">
      {/* PRODUCT CATEGORIES: Horizontal bar */}
      <div className="container">
        <CategoryProductList />
      </div>

      {/* ALL PRODUCTS */}
      <div className="container py-4">
        <h4 className="section-title font-weight-bold text-dark text-uppercase">
          <i className="fa-solid fa-store text-primary mr-2"></i>Tất Cả Sản Phẩm
        </h4>
        <ProductList />
      </div>
    </main>
  );
};

export default ProductsPage;
