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
        setProducts(data);
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
        Đang tải danh sách sản phẩm thời trang...
      </div>
    );
  }

  return (
    <div className="row">
      {products.length === 0 ? (
        <div className="col-12 text-center py-5 text-muted">
          Chưa có sản phẩm nào trong hệ thống.
        </div>
      ) : (
        products.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card h-100 shadow-sm border-0 rounded-lg">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title font-weight-bold text-dark">
                  {item.name}
                </h5>
                <p
                  className="card-text text-danger font-weight-bold mb-1"
                  style={{ fontSize: "1.2rem" }}
                >
                  {/* Hàm tự động chuyển số thành định dạng tiền tệ Việt Nam (VND) */}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}
                </p>
                <p className="card-text text-muted small mb-0">
                  <i className="fa-solid fa-boxes mr-1"></i> Số lượng tồn kho:{" "}
                  <strong>{item.stockQuantity}</strong> sản phẩm
                </p>
              </div>
              <div className="card-footer bg-white border-top-0 text-center">
                <a
                  href="#"
                  className="btn btn-outline-primary btn-sm px-4 rounded-pill"
                >
                  <i className="fa-solid fa-eye mr-1"></i> Xem chi tiết
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
