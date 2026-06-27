import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  // Trích xuất brand từ tên sản phẩm (nếu có)
  const detectBrand = (name) => {
    const lower = (name || "").toLowerCase();
    if (lower.includes("logitech")) return "LOGITECH";
    if (lower.includes("razer")) return "RAZER";
    if (lower.includes("steelseries")) return "STEELSERIES";
    if (lower.includes("corsair")) return "CORSAIR";
    if (lower.includes("hyperx")) return "HYPERX";
    if (lower.includes("akko")) return "AKKO";
    if (lower.includes("keychron")) return "KEYCHRON";
    if (lower.includes("ducky")) return "DUCKY";
    return "";
  };

  // Trích xuất tag từ tên/mô tả
  const detectTags = (product) => {
    const text = (
      (product.name || "") +
      " " +
      (product.description || "")
    ).toLowerCase();
    const tags = [];
    if (text.includes("wireless") || text.includes("không dây"))
      tags.push("WIRELESS");
    if (text.includes("ultralight") || text.includes("siêu nhẹ"))
      tags.push("ULTRALIGHT");
    if (text.includes("wired") || text.includes("có dây")) tags.push("WIRED");
    if (text.includes("ergonomic") || text.includes("công thái học"))
      tags.push("ERGONOMIC");
    if (tags.length === 0) tags.push("OPTICAL");
    return tags;
  };

  const brand = detectBrand(product.name);
  const tags = detectTags(product);
  const subtitle = [brand, ...tags].filter(Boolean).join(" // ");
  const isNew = product.id > 40; // heuristic: ID cao = sản phẩm mới
  const isBestSeller = product.id <= 10 && product.id % 3 === 0;

  return (
    <Link
      to={`/products/${product.id}`}
      className="text-decoration-none"
      style={{ color: "inherit" }}
    >
      <article className="product-gear-card card border h-100">
      <div className="product-gear-img-wrapper position-relative">
        <img
          src={
            product.imageUrl ||
            "https://placehold.co/400x400/1a1a1a/666?text=GEAR"
          }
          className="card-img-top"
          alt={product.name}
        />
        {isNew && (
          <span
            className="badge badge-dark position-absolute"
            style={{
              top: "12px",
              left: "12px",
              letterSpacing: "1px",
              fontSize: "10px",
            }}
          >
            NEW ARRIVAL
          </span>
        )}
        {isBestSeller && !isNew && (
          <span
            className="badge badge-secondary position-absolute"
            style={{
              top: "12px",
              left: "12px",
              letterSpacing: "1px",
              fontSize: "10px",
            }}
          >
            BEST SELLER
          </span>
        )}
      </div>
      <div className="card-body d-flex flex-column pb-3">
        {subtitle && (
          <p
            className="text-muted mb-1 text-uppercase"
            style={{ fontSize: "10px", letterSpacing: "2px", fontWeight: 500 }}
          >
            {subtitle}
          </p>
        )}
        <h3
          className="font-weight-bold text-dark mb-2"
          style={{ fontSize: "17px", lineHeight: 1.3 }}
        >
          {product.name}
        </h3>
        <div className="mt-auto d-flex justify-content-between align-items-center pt-2">
          <span className="price-current" style={{ fontSize: "18px" }}>
            {formatPrice(product.price)}
          </span>
          <button
            className="btn btn-sm btn-outline-dark d-flex align-items-center justify-content-center"
            style={{ width: "38px", height: "38px", padding: 0 }}
            title="Thêm vào giỏ hàng"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <i
              className="fa-solid fa-bag-shopping"
              style={{ fontSize: "14px" }}
            ></i>
          </button>
        </div>
      </div>
    </article>
    </Link>
  );
};

export default ProductCard;
