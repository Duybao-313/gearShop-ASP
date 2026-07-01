using duybao.data.Entities;

namespace duybao.Backend.Services
{
    public interface IEmailService
    {
        /// <summary>
        /// Gửi email xác nhận đơn hàng thành công qua Brevo API
        /// </summary>
        /// <param name="customer">Thông tin khách hàng (cần Email, FullName)</param>
        /// <param name="order">Đơn hàng vừa tạo (cần Id, OrderDate)</param>
        /// <param name="items">Danh sách sản phẩm kèm tên và số lượng</param>
        /// <param name="totalAmount">Tổng tiền đơn hàng</param>
        /// <returns>true nếu gửi thành công, false nếu thất bại</returns>
        Task<bool> SendOrderConfirmationAsync(
            Customer customer,
            Order order,
            List<(string ProductName, int Quantity, decimal UnitPrice)> items,
            decimal totalAmount);

        /// <summary>
        /// Gửi email đặt lại mật khẩu qua Brevo API
        /// </summary>
        /// <param name="email">Email người nhận</param>
        /// <param name="username">Tên đăng nhập</param>
        /// <param name="resetLink">Link đặt lại mật khẩu</param>
        /// <returns>true nếu gửi thành công</returns>
        Task<bool> SendPasswordResetAsync(string email, string username, string resetLink);
    }
}
