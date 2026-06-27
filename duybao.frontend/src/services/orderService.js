import axiosClient from "../api/axiosClient";

/**
 * Order Service — Gọi API Đơn Hàng (OrdersController)
 * Base: /api/Orders
 */
const orderService = {
  /**
   * Tạo đơn hàng mới từ giỏ hàng
   * POST /api/Orders
   * @param {Object} orderData - { customerId, notes }
   * @returns {Promise<Object>} - { message, orderId }
   */
  createOrder(orderData) {
    return axiosClient.post("/Orders", orderData);
  },

  /**
   * Lấy danh sách đơn hàng (Admin)
   * GET /api/Orders
   * @returns {Promise<Array>}
   */
  getAllOrders() {
    return axiosClient.get("/Orders");
  },

  /**
   * Lấy chi tiết đơn hàng (Admin)
   * GET /api/Orders/{id}
   * @param {number} id - Mã đơn hàng
   * @returns {Promise<Object>}
   */
  getOrderDetail(id) {
    return axiosClient.get(`/Orders/${id}`);
  },

  /**
   * Cập nhật trạng thái đơn hàng (Admin)
   * PUT /api/Orders/{id}/status
   * @param {number} id - Mã đơn hàng
   * @param {number} status - 0: Chờ duyệt, 1: Đang giao, 2: Đã xong
   * @returns {Promise<Object>}
   */
  updateOrderStatus(id, status) {
    return axiosClient.put(`/Orders/${id}/status`, { status });
  },
};

export default orderService;
