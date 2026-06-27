import React, { useState } from "react";

/**
 * ProductGallery - Hiển thị gallery ảnh sản phẩm
 * @param {Object} props
 * @param {string} props.mainImage - Ảnh chính (imageUrl)
 * @param {string[]} props.images - Mảng URL ảnh phụ (đã parse từ JSON)
 * @param {string} props.productName - Tên sản phẩm (dùng cho alt)
 * @param {string} props.brand - Thương hiệu (hiển thị badge)
 */
const ProductGallery = ({ mainImage, images = [], productName, brand }) => {
  const allImages = mainImage
    ? [mainImage, ...images.filter((img) => img !== mainImage)]
    : images;

  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = allImages[activeIndex] || mainImage;

  const placeholder =
    "https://placehold.co/600x600/1a1a1a/666?text=GEAR";

  return (
    <div className="product-gallery">
      {/* Main Image */}
      <div className="product-gallery-main bg-light border d-flex align-items-center justify-content-center overflow-hidden"
        style={{ height: "480px", position: "relative" }}>
        <img
          src={currentImage || placeholder}
          alt={productName}
          className="img-fluid p-4"
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            transition: "transform 0.5s ease",
          }}
        />
        {brand && (
          <span
            className="badge badge-dark position-absolute"
            style={{
              top: "16px",
              left: "16px",
              letterSpacing: "2px",
              fontSize: "10px",
              padding: "8px 12px",
            }}
          >
            {brand}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="d-flex flex-wrap mt-2" style={{ gap: "8px" }}>
          {allImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`border d-flex align-items-center justify-content-center bg-white ${idx === activeIndex ? "border-dark" : "border-light"}`}
              style={{
                width: "80px",
                height: "80px",
                cursor: "pointer",
                transition: "border-color 0.2s",
                flexShrink: 0,
              }}
            >
              <img
                src={img || placeholder}
                alt={`${productName} ${idx + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  padding: "4px",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
