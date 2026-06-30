using System;

namespace duybao.data
{
    /// <summary>
    /// Tiện ích mã hóa và xác minh mật khẩu sử dụng BCrypt.
    /// </summary>
    public static class PasswordHasher
    {
        /// <summary>
        /// Băm (hash) mật khẩu bằng BCrypt.
        /// </summary>
        /// <param name="password">Mật khẩu plain text</param>
        /// <returns>Chuỗi hash BCrypt (bắt đầu bằng $2a$, $2b$ hoặc $2y$)</returns>
        public static string Hash(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Mật khẩu không được để trống.", nameof(password));

            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        /// <summary>
        /// Xác minh mật khẩu plain text với hash đã lưu.
        /// Tự động phát hiện: nếu hash chưa phải BCrypt thì so sánh plain text,
        /// sau đó trả về hash mới để upgrade (nếu cần).
        /// </summary>
        /// <param name="password">Mật khẩu plain text người dùng nhập</param>
        /// <param name="storedHash">Hash đã lưu trong database</param>
        /// <param name="upgradedHash">Hash BCrypt mới (nếu cần upgrade), null nếu không cần</param>
        /// <returns>true nếu mật khẩu khớp, false nếu không</returns>
        public static bool Verify(string password, string storedHash, out string? upgradedHash)
        {
            upgradedHash = null;

            if (string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(storedHash))
                return false;

            // Nếu storedHash là BCrypt hash (bắt đầu bằng $2)
            if (storedHash.StartsWith("$2"))
            {
                bool verified = BCrypt.Net.BCrypt.Verify(password, storedHash);
                // BCrypt.Net-Base không tự động upgrade, nhưng nếu verify ok và work factor cũ,
                // ta có thể tạo hash mới. Để đơn giản, ta luôn tạo hash mới khi verify thành công.
                if (verified)
                {
                    upgradedHash = BCrypt.Net.BCrypt.HashPassword(password);
                }
                return verified;
            }

            // Fallback: so sánh plain text (cho user cũ chưa được hash)
            if (password == storedHash)
            {
                // Upgrade: tạo BCrypt hash mới
                upgradedHash = BCrypt.Net.BCrypt.HashPassword(password);
                return true;
            }

            return false;
        }

        /// <summary>
        /// Kiểm tra xem một chuỗi có phải là BCrypt hash không.
        /// </summary>
        public static bool IsBcryptHash(string hash)
        {
            return !string.IsNullOrEmpty(hash) && hash.StartsWith("$2");
        }
    }
}
