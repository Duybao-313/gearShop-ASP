import axiosClient from "../api/axiosClient";

/**
 * Cart Service — Gọi Cart API (yêu cầu đã đăng nhập)
 * Base: /api/Cart
 */
const cartService = {
  /**
   * Lấy giỏ hàng từ server
   * GET /api/Cart
   */
  getCart() {
    return axiosClient.get("/Cart");
  },

  /**
   * Thêm sản phẩm vào giỏ hàng
   * POST /api/Cart
   * @param {number} productId
   * @param {number} quantity
   */
  addToCart(productId, quantity = 1) {
    return axiosClient.post("/Cart", { productId, quantity });
  },

  /**
   * Cập nhật số lượng
   * PUT /api/Cart/{id}
   * @param {number} id - CartItem ID trên server
   * @param {number} quantity
   */
  updateQuantity(id, quantity) {
    return axiosClient.put(`/Cart/${id}`, { quantity });
  },

  /**
   * Xóa một sản phẩm khỏi giỏ
   * DELETE /api/Cart/{id}
   * @param {number} id - CartItem ID trên server
   */
  removeFromCart(id) {
    return axiosClient.delete(`/Cart/${id}`);
  },

  /**
   * Xóa toàn bộ giỏ hàng
   * DELETE /api/Cart
   */
  clearCart() {
    return axiosClient.delete("/Cart");
  },

  /**
   * Gộp giỏ hàng localStorage vào backend (sau khi login)
   * POST /api/Cart/merge
   * @param {Array} items - [{ productId, quantity }, ...]
   */
  mergeCart(items) {
    return axiosClient.post("/Cart/merge", items);
  },
};

export default cartService;
