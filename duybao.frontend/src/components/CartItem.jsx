import React from "react";
import { useCart } from "../context/CartContext";

// ─── Format tiền VND ─────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

// ─── CartItem Component ──────────────────────────────────────────
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="row align-items-center py-3 border-bottom">
      {/* Product Info */}
      <div className="col-12 col-md-6 d-flex align-items-center mb-2 mb-md-0">
        <div
          className="cart-item-img-wrapper mr-3 bg-light border d-flex align-items-center justify-content-center"
          style={{
            width: "80px",
            height: "80px",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <img
            src={
              item.imageUrl ||
              "https://placehold.co/400x400/1a1a1a/666?text=GEAR"
            }
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div>
          {item.brand && (
            <span
              className="badge badge-light text-uppercase mb-1 d-inline-block"
              style={{ fontSize: "10px", letterSpacing: "1px" }}
            >
              {item.brand}
            </span>
          )}
          <h6
            className="mb-0 text-uppercase font-weight-bold"
            style={{ fontSize: "14px" }}
          >
            {item.name}
          </h6>
          {item.sku && (
            <small
              className="text-muted"
              style={{ fontSize: "10px", letterSpacing: "0.5px" }}
            >
              SKU: {item.sku}
            </small>
          )}
          <br />
          <button
            className="btn btn-link text-muted p-0 mt-1"
            onClick={handleRemove}
            style={{
              fontSize: "11px",
              letterSpacing: "1px",
              textDecoration: "none",
            }}
          >
            <i className="fa-solid fa-xmark mr-1"></i>XÓA
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="col-4 col-md-2 text-center">
        <span className="font-weight-bold" style={{ fontSize: "15px" }}>
          {formatPrice(item.price)}
        </span>
      </div>

      {/* Quantity */}
      <div className="col-4 col-md-2 d-flex justify-content-center">
        <div className="d-flex border" style={{ height: "36px" }}>
          <button
            className="btn btn-sm px-3 border-0 rounded-0"
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            style={{
              fontSize: "16px",
              lineHeight: 1,
              backgroundColor: "transparent",
            }}
          >
            −
          </button>
          <input
            className="text-center border-left border-right bg-transparent"
            type="text"
            value={item.quantity}
            readOnly
            style={{
              width: "42px",
              fontSize: "13px",
              fontWeight: 600,
              border: "none",
              outline: "none",
              background: "transparent",
            }}
          />
          <button
            className="btn btn-sm px-3 border-0 rounded-0"
            onClick={handleIncrease}
            style={{
              fontSize: "16px",
              lineHeight: 1,
              backgroundColor: "transparent",
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="col-4 col-md-2 text-right">
        <span className="font-weight-bold" style={{ fontSize: "16px" }}>
          {formatPrice(subtotal)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
