import React, { useState, useEffect } from "react";
import categoryProductService from "../services/categoryProductService";

const sampleCategories = [
  { id: 1, name: "Trang phục nữ mặc ở nhà" },
  { id: 2, name: "Vest & Âu phục nam" },
  { id: 3, name: "Đầm dạ hội quý phái" },
  { id: 4, name: "Thời trang công sở nữ" },
  { id: 5, name: "Phụ kiện thời trang" },
];

const CategoryProductList = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const data = await categoryProductService.getAllCategoryProducts();
        if (data && data.length > 0) {
          setCategoryProducts(data);
        } else {
          setCategoryProducts(sampleCategories);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục sản phẩm:", error);
        setCategoryProducts(sampleCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4">Đang tải danh mục sản phẩm...</div>
    );
  }

  const displayCategories =
    categoryProducts.length > 0 ? categoryProducts : sampleCategories;

  return (
    <div className="category-bar-wrapper">
      <div className="d-flex align-items-center flex-wrap">
        <span className="font-weight-bold text-dark mr-3 mb-2">
          <i className="fa-solid fa-cubes text-primary mr-1"></i> Danh mục:
        </span>
        <button
          className={`category-pill ${activeCategory === null ? "active" : ""}`}
          onClick={() => setActiveCategory(null)}
        >
          Tất cả
        </button>
        {displayCategories.map((item) => (
          <button
            key={item.id}
            className={`category-pill ${activeCategory === item.id ? "active" : ""}`}
            onClick={() => setActiveCategory(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductList;
