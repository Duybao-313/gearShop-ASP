import React, { useState, useEffect } from "react";
import productService from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data || []);
      } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Đang tải...</span>
        </div>
        <p className="text-muted mt-2">Đang tải danh sách sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="row">
      {products.length === 0 ? (
        <div className="col-12 text-center py-5 text-muted">
          Chưa có sản phẩm nào.
        </div>
      ) : (
        products.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card product-card h-100 shadow-sm border-0 rounded-lg overflow-hidden">
              <div className="product-img-wrapper">
                <img
                  src={
                    item.imageUrl ||
                    "https://placehold.co/400x500/eee/999?text=Product"
                  }
                  className="card-img-top"
                  alt={item.name}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h6 className="card-title font-weight-bold text-dark mb-2">
                  {item.name}
                </h6>
                <p className="card-text price-current mb-2">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}
                </p>
                <p className="card-text text-muted small mb-3">
                  <i className="fa-solid fa-boxes mr-1"></i> Còn:{" "}
                  <strong>{item.stockQuantity}</strong> sản phẩm
                </p>
                <div className="mt-auto d-flex justify-content-between">
                  <a
                    href="#"
                    className="btn btn-outline-primary btn-sm px-3 rounded-pill flex-fill mr-1"
                  >
                    <i className="fa-solid fa-eye mr-1"></i> Chi tiết
                  </a>
                  <a
                    href="#"
                    className="btn btn-danger btn-sm px-3 rounded-pill flex-fill ml-1"
                  >
                    <i className="fa-solid fa-bag-shopping mr-1"></i> Mua ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
