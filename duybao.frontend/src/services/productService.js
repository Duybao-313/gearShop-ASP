import axiosClient from "../api/axiosClient";

const productService = {
  // Lấy toàn bộ danh sách sản phẩm
  getAllProducts: () => {
    const url = "/products";
    return axiosClient.get(url);
  },

  // Lấy chi tiết 1 sản phẩm theo ID (kèm category, reviews)
  getProductById: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
};

export default productService;
