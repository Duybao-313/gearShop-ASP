using System.Text;
using System.Text.Json;
using duybao.data.Entities;

namespace duybao.Backend.Services
{
    public class EmailService : IEmailService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(HttpClient httpClient, IConfiguration configuration, ILogger<EmailService> logger)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<bool> SendOrderConfirmationAsync(
            Customer customer,
            Order order,
            List<(string ProductName, int Quantity, decimal UnitPrice)> items,
            decimal totalAmount)
        {
            try
            {
                var apiKey = _configuration["Brevo:ApiKey"];
                var senderName = _configuration["Brevo:SenderName"] ?? "GearShop";
                var senderEmail = _configuration["Brevo:SenderEmail"] ?? "noreply@duybao.com";

                if (string.IsNullOrEmpty(apiKey))
                {
                    _logger.LogWarning("Brevo API Key chưa được cấu hình. Bỏ qua gửi email.");
                    return false;
                }

                // ── Xây dựng nội dung HTML ──
                var htmlContent = BuildOrderConfirmationHtml(customer, order, items, totalAmount);

                // ── Tạo request body theo Brevo API ──
                var payload = new
                {
                    sender = new { name = senderName, email = senderEmail },
                    to = new[] { new { name = customer.FullName, email = customer.Email } },
                    subject = $"Xác nhận đơn hàng #{order.Id} - GearShop",
                    htmlContent
                };

                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                // ── Gọi Brevo API ──
                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.brevo.com/v3/smtp/email")
                {
                    Content = content
                };
                request.Headers.Add("api-key", apiKey);
                request.Headers.Add("accept", "application/json");

                var response = await _httpClient.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation("Đã gửi email xác nhận đơn hàng #{OrderId} tới {Email}", order.Id, customer.Email);
                    return true;
                }

                var errorBody = await response.Content.ReadAsStringAsync();
                _logger.LogWarning("Brevo API trả về lỗi {StatusCode} cho đơn hàng #{OrderId}: {Error}",
                    (int)response.StatusCode, order.Id, errorBody);
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi gửi email xác nhận đơn hàng #{OrderId}", order.Id);
                return false;
            }
        }

        /// <summary>
        /// Tạo nội dung HTML cho email xác nhận đơn hàng
        /// </summary>
        private static string BuildOrderConfirmationHtml(
            Customer customer,
            Order order,
            List<(string ProductName, int Quantity, decimal UnitPrice)> items,
            decimal totalAmount)
        {
            var sb = new StringBuilder();
            sb.AppendLine("<!DOCTYPE html>");
            sb.AppendLine("<html lang=\"vi\">");
            sb.AppendLine("<head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></head>");
            sb.AppendLine("<body style=\"font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px;\">");
            sb.AppendLine("<div style=\"max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);\">");

            // ── Header ──
            sb.AppendLine("<div style=\"background: #2d89ef; color: #fff; padding: 24px; text-align: center;\">");
            sb.AppendLine("<h1 style=\"margin: 0; font-size: 22px;\">⚙️ GearShop</h1>");
            sb.AppendLine("<p style=\"margin: 8px 0 0; font-size: 14px; opacity: 0.9;\">Xác nhận đơn hàng thành công</p>");
            sb.AppendLine("</div>");

            // ── Body ──
            sb.AppendLine("<div style=\"padding: 24px;\">");
            sb.AppendLine($"<p>Xin chào <strong>{System.Net.WebUtility.HtmlEncode(customer.FullName)}</strong>,</p>");
sb.AppendLine("<p>Cảm ơn bạn đã đặt hàng tại GearShop! Đơn hàng của bạn đã được tiếp nhận.</p>");
            // ── Thông tin đơn hàng ──
            sb.AppendLine("<div style=\"background: #f0f7ff; border: 1px solid #cce5ff; border-radius: 6px; padding: 16px; margin: 16px 0;\">");
            sb.AppendLine($"<p style=\"margin: 4px 0;\"><strong>📦 Mã đơn hàng:</strong> #{order.Id}</p>");
            sb.AppendLine($"<p style=\"margin: 4px 0;\"><strong>📅 Ngày đặt:</strong> {order.OrderDate:dd/MM/yyyy HH:mm}</p>");
            sb.AppendLine($"<p style=\"margin: 4px 0;\"><strong>📊 Trạng thái:</strong> Chờ xác nhận</p>");
            sb.AppendLine("</div>");

            // ── Bảng sản phẩm ──
            sb.AppendLine("<table style=\"width: 100%; border-collapse: collapse; margin: 12px 0;\">");
            sb.AppendLine("<thead><tr style=\"background: #fafafa; border-bottom: 2px solid #eee;\">");
            sb.AppendLine("<th style=\"text-align: left; padding: 10px 8px;\">Sản phẩm</th>");
            sb.AppendLine("<th style=\"text-align: center; padding: 10px 8px;\">SL</th>");
            sb.AppendLine("<th style=\"text-align: right; padding: 10px 8px;\">Đơn giá</th>");
            sb.AppendLine("<th style=\"text-align: right; padding: 10px 8px;\">Thành tiền</th>");
            sb.AppendLine("</tr></thead><tbody>");

            foreach (var (productName, quantity, unitPrice) in items)
            {
                var lineTotal = quantity * unitPrice;
                sb.AppendLine("<tr style=\"border-bottom: 1px solid #eee;\">");
                sb.AppendLine($"<td style=\"padding: 10px 8px;\">{System.Net.WebUtility.HtmlEncode(productName)}</td>");
                sb.AppendLine($"<td style=\"text-align: center; padding: 10px 8px;\">{quantity}</td>");
                sb.AppendLine($"<td style=\"text-align: right; padding: 10px 8px;\">{unitPrice:N0}đ</td>");
                sb.AppendLine($"<td style=\"text-align: right; padding: 10px 8px;\">{lineTotal:N0}đ</td>");
                sb.AppendLine("</tr>");
            }

            sb.AppendLine("</tbody></table>");

            // ── Tổng cộng ──
            sb.AppendLine("<div style=\"text-align: right; font-size: 18px; font-weight: bold; padding: 12px 0; border-top: 2px solid #eee; margin-top: 8px;\">");
            sb.AppendLine($"Tổng cộng: {totalAmount:N0}đ");
            sb.AppendLine("</div>");

            sb.AppendLine("<p style=\"color: #666; font-size: 14px; margin-top: 16px;\">Chúng tôi sẽ sớm liên hệ để xác nhận đơn hàng của bạn.</p>");
            sb.AppendLine("</div>");

            // ── Footer ──
            sb.AppendLine("<div style=\"background: #fafafa; padding: 16px 24px; text-align: center; font-size: 12px; color: #999;\">");
            sb.AppendLine("<p>© 2026 GearShop. Mọi quyền được bảo lưu.</p>");
            sb.AppendLine("<p>Email này được gửi tự động, vui lòng không trả lời.</p>");
            sb.AppendLine("</div>");

            sb.AppendLine("</div></body></html>");
            return sb.ToString();
        }

        public async Task<bool> SendPasswordResetAsync(string email, string username, string resetLink)
        {
            try
            {
                var apiKey = _configuration["Brevo:ApiKey"];
                var senderName = _configuration["Brevo:SenderName"] ?? "GearShop";
                var senderEmail = _configuration["Brevo:SenderEmail"] ?? "noreply@duybao.com";

                if (string.IsNullOrEmpty(apiKey))
                {
                    _logger.LogWarning("Brevo API Key chưa được cấu hình. Bỏ qua gửi email reset password.");
                    return false;
                }

                var htmlContent = BuildPasswordResetHtml(username, resetLink);

                var payload = new
                {
                    sender = new { name = senderName, email = senderEmail },
                    to = new[] { new { name = username, email } },
                    subject = "Đặt lại mật khẩu - GearShop",
                    htmlContent
                };

                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.brevo.com/v3/smtp/email")
                {
                    Content = content
                };
                request.Headers.Add("api-key", apiKey);
                request.Headers.Add("accept", "application/json");

                var response = await _httpClient.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation("Đã gửi email reset password tới {Email}", email);
                    return true;
                }

                var errorBody = await response.Content.ReadAsStringAsync();
                _logger.LogWarning("Brevo API lỗi {StatusCode} khi gửi email reset password: {Error}",
                    (int)response.StatusCode, errorBody);
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi gửi email reset password tới {Email}", email);
                return false;
            }
        }

        private static string BuildPasswordResetHtml(string username, string resetLink)
        {
            var sb = new StringBuilder();
            sb.AppendLine("<!DOCTYPE html>");
            sb.AppendLine("<html lang=\"vi\">");
            sb.AppendLine("<head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></head>");
            sb.AppendLine("<body style=\"font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px;\">");
            sb.AppendLine("<div style=\"max-width: 500px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);\">");

            // Header
            sb.AppendLine("<div style=\"background: #2d89ef; color: #fff; padding: 24px; text-align: center;\">");
            sb.AppendLine("<h1 style=\"margin: 0; font-size: 20px;\">⚙️ GearShop</h1>");
            sb.AppendLine("<p style=\"margin: 8px 0 0; font-size: 14px; opacity: 0.9;\">Đặt lại mật khẩu</p>");
            sb.AppendLine("</div>");

            // Body
            sb.AppendLine("<div style=\"padding: 24px;\">");
            sb.AppendLine($"<p>Xin chào <strong>{System.Net.WebUtility.HtmlEncode(username)}</strong>,</p>");
            sb.AppendLine("<p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>");
            sb.AppendLine("<p>Nhấn vào nút bên dưới để đặt lại mật khẩu:</p>");

            // Reset button - dùng table để tương thích mọi email client
            sb.AppendLine("<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"margin: 24px 0;\">");
            sb.AppendLine("<tr><td align=\"center\">");
            sb.AppendLine($"<a href=\"{System.Net.WebUtility.HtmlEncode(resetLink)}\" target=\"_blank\" style=\"display: inline-block; background-color: #2d89ef; color: #ffffff; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif;\">ĐẶT LẠI MẬT KHẨU</a>");
            sb.AppendLine("</td></tr></table>");

            sb.AppendLine("<p style=\"color: #666; font-size: 13px;\">Link này có hiệu lực trong <strong>15 phút</strong>. Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>");

            // Divider
            sb.AppendLine("<hr style=\"border: none; border-top: 1px solid #eee; margin: 16px 0;\">");
            sb.AppendLine("<p style=\"color: #999; font-size: 11px;\">Nếu nút không hoạt động, hãy sao chép link sau vào trình duyệt:</p>");
            sb.AppendLine($"<p style=\"color: #2d89ef; font-size: 11px; word-break: break-all;\">{System.Net.WebUtility.HtmlEncode(resetLink)}</p>");
            sb.AppendLine("</div>");

            // Footer
            sb.AppendLine("<div style=\"background: #fafafa; padding: 12px 24px; text-align: center; font-size: 11px; color: #999;\">");
            sb.AppendLine("<p>© 2026 GearShop. Mọi quyền được bảo lưu.</p>");
            sb.AppendLine("<p>Email này được gửi tự động, vui lòng không trả lời.</p>");
            sb.AppendLine("</div>");

            sb.AppendLine("</div></body></html>");
            return sb.ToString();
        }
    }
}
