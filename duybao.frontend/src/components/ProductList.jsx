import React, { useState, useEffect } from "react";
import productService from "../services/productService";

const sampleProducts = [
  {
    id: 1,
    name: "Đầm dạ hội quý phái",
    price: 2400000,
    imageUrl: "https://placehold.co/400x500/eee/999?text=Đầm+Dạ+Hội",
    stockQuantity: 15,
  },
  {
    id: 2,
    name: "Vest nam cao cấp",
    price: 3200000,
    imageUrl: "https://placehold.co/400x500/eee/999?text=Vest+Nam",
    stockQuantity: 10,
  },
  {
    id: 3,
    name: "Áo sơ mi công sở nữ",
    price: 550000,
    imageUrl: "https://placehold.co/400x500/eee/999?text=Sơ+Mi+Nữ",
    stockQuantity: 25,
  },
  {
    id: 4,
    name: "Chân váy bút chì",
    price: 680000,
    imageUrl: "https://placehold.co/400x500/eee/999?text=Chân+Váy",
    stockQuantity: 20,
  },
  {
    id: 5,
    name: "Quần tây nam",
    price: 890000,
    imageUrl: "https://placehold.co/400x500/eee/999?text=Quần+Tây",
    stockQuantity: 18,
  },
  {
    id: 6,
    name: "Đầm công sở thanh lịch",
    price: 1250000,
    imageUrl: "https://placehold.co/400x500/eee/999?text=Đầm+Công+Sở",
    stockQuantity: 12,
  },
  {
    id: 7,
    name: "Áo blazer nữ",
    price: 1850000,
    imageUrl: "https://placehold.co/400x500/eee/999?text=Blazer+Nữ",
    stockQuantity: 8,
  },
  {
    id: 8,
    name: "Sơ mi nam trắng",
    price: 450000,
    imageUrl: "https://placehold.co/400x500/eee/999?text=Sơ+Mi+Trắng",
    stockQuantity: 30,
  },
  {
    id: 9,
    name: "Bộ vest nữ công sở",
    price: 2800000,
    imageUrl: "https://placehold.co/400x500/eee/999?text=Vest+Nữ",
    stockQuantity: 7,
  },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        // If API returns data use it, otherwise use sample data
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(sampleProducts);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
        // Fallback to sample data when API fails
        setProducts(sampleProducts);
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

  const displayProducts = products.length > 0 ? products : sampleProducts;

  return (
    <div className="row">
      {displayProducts.map((item) => (
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
      ))}
    </div>
  );
};

export default ProductList;
