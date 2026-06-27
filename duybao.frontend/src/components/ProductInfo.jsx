import React, { useState } from "react";
import { useCart } from "../context/CartContext";

/**
 * ProductInfo - Hiển thị thông tin chi tiết sản phẩm
 * @param {Object} product - Đối tượng sản phẩm từ API
 */
const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  if (!product) return null;

  const {
    name,
    price,
    discountPercentage,
    rating,
    stockQuantity,
    brand,
    sku,
    description,
    categoryProduct,
  } = product;

  const discountedPrice =
    discountPercentage > 0 ? price - price * (discountPercentage / 100) : price;

  const isInStock = stockQuantity > 0;

  // Render sao đánh giá
  const renderStars = (ratingValue) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue || 0);
    const hasHalf = (ratingValue || 0) - fullStars >= 0.25;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <i key={i} className="fa-solid fa-star text-warning mr-1"></i>,
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <i
            key={i}
            className="fa-solid fa-star-half-stroke text-warning mr-1"
          ></i>,
        );
      } else {
        stars.push(
          <i key={i} className="fa-regular fa-star text-muted mr-1"></i>,
        );
      }
    }
    return stars;
  };

  return (
    <div className="product-info">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb bg-transparent p-0 small text-muted">
          <li className="breadcrumb-item">
            <a href="/" className="text-muted">
              Trang Chủ
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href="/products" className="text-muted">
              Cửa Hàng
            </a>
          </li>
          {categoryProduct && (
            <li className="breadcrumb-item text-muted">
              {categoryProduct.name}
            </li>
          )}
        </ol>
      </nav>

      {/* Tên + Thương hiệu */}
      <h1
        className="font-weight-bold text-uppercase text-dark mb-2"
        style={{ letterSpacing: "-1px", fontSize: "2rem", lineHeight: 1.2 }}
      >
        {name}
      </h1>
      {brand && (
        <span
          className="badge badge-outline-dark mb-3 text-uppercase"
          style={{ letterSpacing: "1px", fontSize: "11px" }}
        >
          {brand}
        </span>
      )}

      {/* Giá */}
      <div
        className="d-flex align-items-center flex-wrap mb-3"
        style={{ gap: "12px" }}
      >
        <span
          className="text-dark font-weight-bold"
          style={{ fontSize: "1.8rem" }}
        >
          {formatPrice(discountedPrice)}
        </span>
        {discountPercentage > 0 && (
          <>
            <span
              className="text-muted"
              style={{ textDecoration: "line-through", fontSize: "1.1rem" }}
            >
              {formatPrice(price)}
            </span>
            <span
              className="badge badge-dark text-uppercase"
              style={{ letterSpacing: "1px", fontSize: "11px" }}
            >
              -{discountPercentage}%
            </span>
          </>
        )}
      </div>

      {/* Rating + SKU + Tồn kho */}
      <div
        className="d-flex align-items-center flex-wrap mb-3"
        style={{ gap: "16px" }}
      >
        {rating > 0 && (
          <div className="d-flex align-items-center">
            {renderStars(rating)}
            <span className="ml-1 small text-muted">({rating})</span>
          </div>
        )}
        {sku && (
          <span className="badge badge-light border small text-uppercase">
            SKU: {sku}
          </span>
        )}
        <span
          className={`badge ${isInStock ? "badge-dark" : "badge-danger"} text-uppercase`}
          style={{ letterSpacing: "1px", fontSize: "10px" }}
        >
          {isInStock ? `Còn hàng (${stockQuantity})` : "Hết hàng"}
        </span>
      </div>

      <hr />

      {/* Mô tả ngắn */}
      {description && (
        <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>
          {description.length > 250
            ? description.substring(0, 250) + "..."
            : description}
        </p>
      )}

      {/* Specs nhanh */}
      <div className="mb-4">
        <h6
          className="text-uppercase font-weight-bold text-dark mb-3"
          style={{ fontSize: "12px", letterSpacing: "2px" }}
        >
          Thông Số Kỹ Thuật
        </h6>
        <table
          className="table table-sm table-borderless text-muted"
          style={{ fontSize: "13px" }}
        >
          <tbody>
            {brand && (
              <tr>
                <td
                  className="pl-0 text-uppercase"
                  style={{ width: "130px", fontWeight: 600, color: "#555" }}
                >
                  Thương hiệu
                </td>
                <td className="text-dark">{brand}</td>
              </tr>
            )}
            {sku && (
              <tr>
                <td
                  className="pl-0 text-uppercase"
                  style={{ width: "130px", fontWeight: 600, color: "#555" }}
                >
                  Mã SP
                </td>
                <td className="text-dark">{sku}</td>
              </tr>
            )}
            {categoryProduct && (
              <tr>
                <td
                  className="pl-0 text-uppercase"
                  style={{ width: "130px", fontWeight: 600, color: "#555" }}
                >
                  Danh mục
                </td>
                <td className="text-dark">{categoryProduct.name}</td>
              </tr>
            )}
            <tr>
              <td
                className="pl-0 text-uppercase"
                style={{ width: "130px", fontWeight: 600, color: "#555" }}
              >
                Tình trạng
              </td>
              <td className={isInStock ? "text-success" : "text-danger"}>
                {isInStock ? "Còn hàng" : "Hết hàng"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Số lượng + Nút hành động */}
      <div className="d-flex flex-column" style={{ gap: "12px" }}>
        {/* Chọn số lượng */}
        <div className="d-flex align-items-center" style={{ gap: "12px" }}>
          <span
            className="text-uppercase text-muted"
            style={{ fontSize: "12px", letterSpacing: "1px" }}
          >
            Số Lượng:
          </span>
          <div className="d-flex align-items-center border">
            <button
              className="btn btn-sm btn-link text-dark text-decoration-none px-3"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              −
            </button>
            <span
              className="px-3"
              style={{
                fontSize: "14px",
                minWidth: "36px",
                textAlign: "center",
              }}
            >
              {quantity}
            </span>
            <button
              className="btn btn-sm btn-link text-dark text-decoration-none px-3"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          {!isInStock && (
            <span
              className="text-danger small text-uppercase"
              style={{ fontSize: "11px" }}
            >
              Hết hàng
            </span>
          )}
        </div>

        <button
          className="btn btn-dark btn-lg btn-block text-uppercase"
          style={{ letterSpacing: "2px", fontSize: "14px" }}
          disabled={!isInStock}
        >
          <i className="fa-solid fa-bolt mr-2"></i>Mua Ngay
        </button>
        <button
          className={`btn btn-lg btn-block text-uppercase ${
            added ? "btn-success" : "btn-outline-dark"
          }`}
          style={{ letterSpacing: "2px", fontSize: "14px" }}
          disabled={!isInStock}
          onClick={() => {
            if (!isInStock) return;
            addToCart(product, quantity);
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
        >
          <i
            className={`fa-solid mr-2 ${added ? "fa-check" : "fa-cart-shopping"}`}
          ></i>
          {added ? "Đã Thêm Vào Giỏ" : "Thêm Vào Giỏ"}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
