import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import productService from "../services/productService";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductReviews from "../components/ProductReviews";
import RelatedProducts from "../components/RelatedProducts";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductById(id);
        setProduct(data);

        // Fetch sản phẩm cùng danh mục để hiển thị related
        if (data && data.categoryProductId) {
          const allProducts = await productService.getAllProducts();
          const sameCategory = (allProducts || []).filter(
            (p) => p.categoryProductId === data.categoryProductId
          );
          setRelatedProducts(sameCategory);
        }
      } catch (err) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", err);
        setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  // --- Loading State ---
  if (loading) {
    return (
      <main className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-dark" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="sr-only">Đang tải...</span>
          </div>
          <p className="mt-3 text-muted text-uppercase" style={{ letterSpacing: "1px", fontSize: "13px" }}>
            Đang tải sản phẩm...
          </p>
        </div>
      </main>
    );
  }

  // --- Error State ---
  if (error || !product) {
    return (
      <main className="container py-5">
        <div className="text-center py-5">
          <i className="fa-solid fa-triangle-exclamation text-muted mb-3" style={{ fontSize: "3rem", opacity: 0.3 }}></i>
          <h5 className="text-muted">{error || "Không tìm thấy sản phẩm."}</h5>
          <Link to="/products" className="btn btn-dark mt-3 text-uppercase" style={{ letterSpacing: "1px", fontSize: "13px" }}>
            <i className="fa-solid fa-arrow-left mr-2"></i>Quay Lại Cửa Hàng
          </Link>
        </div>
      </main>
    );
  }

  // Parse images JSON string → array
  const parseImages = (imagesStr) => {
    if (!imagesStr) return [];
    try {
      return typeof imagesStr === "string" ? JSON.parse(imagesStr) : imagesStr;
    } catch {
      // Fallback: nếu không phải JSON, có thể là single URL
      return [imagesStr];
    }
  };

  const images = parseImages(product.images);

  return (
    <main>
      {/* ===== PRODUCT DETAIL SECTION ===== */}
      <section className="bg-white border-bottom">
        <div className="container py-4 py-md-5">
          <div className="row">
            {/* Left: Gallery */}
            <div className="col-lg-7 mb-4 mb-lg-0">
              <ProductGallery
                mainImage={product.imageUrl}
                images={images}
                productName={product.name}
                brand={product.brand}
              />
            </div>

            {/* Right: Info */}
            <div className="col-lg-5" style={{ position: "sticky", top: "100px", alignSelf: "flex-start" }}>
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FULL DESCRIPTION ===== */}
      {product.description && product.description.length > 250 && (
        <section className="bg-light border-bottom">
          <div className="container py-4">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <h5 className="font-weight-bold text-uppercase text-dark mb-3"
                  style={{ letterSpacing: "1px", fontSize: "14px" }}>
                  Mô Tả Chi Tiết
                </h5>
                <p className="text-muted" style={{ lineHeight: 1.9, fontSize: "15px" }}>
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container">
        {/* ===== CUSTOMER REVIEWS ===== */}
        <ProductReviews
          reviews={product.reviews || []}
          rating={product.rating || 0}
        />

        {/* ===== RELATED PRODUCTS ===== */}
        <RelatedProducts
          products={relatedProducts}
          currentProductId={product.id}
          categoryName={product.categoryProduct?.name}
        />
      </div>

      {/* Spacing bottom */}
      <div className="py-4"></div>
    </main>
  );
};

export default ProductDetailPage;