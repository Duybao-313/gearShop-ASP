import axios from "axios";

// Auth service dùng axios riêng (không qua axiosClient) vì cần gửi
// form-urlencoded đến MVC endpoint /Account/Login (Cookie Auth),
// không phải REST API JSON thông thường.
const authAxios = axios.create({
  baseURL: "http://localhost:5228",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true, // Gửi/nhận cookie cross-origin
  timeout: 10000,
});

const authService = {
  // Đăng nhập – POST form-urlencoded đến MVC Account/Login
  login: async (username, password) => {
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const response = await authAxios.post("/Account/Login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      const data = response.data;
      if (data && data.success) {
        return { success: true };
      }
      return {
        success: false,
        error: data?.error || "Đăng nhập thất bại. Vui lòng thử lại.",
      };
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.message);
      return {
        success: false,
        error: "Không thể kết nối đến máy chủ. Vui lòng thử lại.",
      };
    }
  },

  // Kiểm tra trạng thái đăng nhập hiện tại
  checkAuth: async () => {
    try {
      const response = await authAxios.get("/Account/Login", {
        headers: {
          Accept: "application/json",
        },
      });
      // Backend trả về JSON { isAuthenticated, username? }
      const data = response.data;
      if (data && data.isAuthenticated) {
        return { isAuthenticated: true, username: data.username };
      }
      return { isAuthenticated: false };
    } catch {
      return { isAuthenticated: false };
    }
  },

  // Đăng xuất
  logout: async () => {
    await authAxios.get("/Account/Logout", {
      maxRedirects: 0,
      validateStatus: (status) => status >= 200 && status <= 302,
    });
    return { success: true };
  },

  // Đăng ký – POST form-urlencoded đến MVC Account/Register
  // Backend trả về JSON { success: true/false, error: "..." }
  register: async (username, password, fullName, email) => {
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      params.append("fullName", fullName);
      params.append("email", email || "");

      const response = await authAxios.post("/Account/Register", params, {
        // Backend trả về JSON 200 (không redirect nữa)
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      // Backend trả về JSON { success, error?, message? }
      const data = response.data;
      if (data && data.success) {
        return { success: true };
      }
      return {
        success: false,
        error: data?.error || "Đăng ký thất bại. Vui lòng thử lại.",
      };
    } catch (err) {
      // Nếu lỗi mạng
      console.error("Lỗi đăng ký:", err.message);
      return {
        success: false,
        error: "Không thể kết nối đến máy chủ. Vui lòng thử lại.",
      };
    }
  },

  // ─── Quên mật khẩu — POST form-urlencoded đến MVC Account/ForgotPassword
  forgotPassword: async (username) => {
    try {
      const params = new URLSearchParams();
      params.append("username", username);

      const response = await authAxios.post("/Account/ForgotPassword", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      const data = response.data;
      if (data && data.success) {
        return { success: true, resetLink: data.resetLink };
      }
      return {
        success: false,
        error: data?.error || "Không thể tạo yêu cầu. Vui lòng thử lại.",
      };
    } catch (err) {
      console.error("Lỗi quên mật khẩu:", err.message);
      return {
        success: false,
        error: "Không thể kết nối đến máy chủ. Vui lòng thử lại.",
      };
    }
  },

  // ─── Đặt lại mật khẩu — POST form-urlencoded đến MVC Account/ResetPassword
  resetPassword: async (token, newPassword, confirmPassword) => {
    try {
      const params = new URLSearchParams();
      params.append("token", token);
      params.append("newPassword", newPassword);
      params.append("confirmPassword", confirmPassword);

      const response = await authAxios.post("/Account/ResetPassword", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      const data = response.data;
      if (data && data.success) {
        return { success: true };
      }
      return {
        success: false,
        error: data?.error || "Đặt lại mật khẩu thất bại. Vui lòng thử lại.",
      };
    } catch (err) {
      console.error("Lỗi đặt lại mật khẩu:", err.message);
      return {
        success: false,
        error: "Không thể kết nối đến máy chủ. Vui lòng thử lại.",
      };
    }
  },

  // ─── Lấy thông tin profile Customer (email, fullName, phone, address) ──
  getProfile: async () => {
    try {
      const response = await authAxios.get("/api/account/profile", {
        headers: { Accept: "application/json" },
      });
      return { success: true, data: response.data };
    } catch {
      return { success: false, data: null };
    }
  },
};

export default authService;
