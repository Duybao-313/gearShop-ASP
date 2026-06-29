import axiosClient from "../api/axiosClient";
import axios from "axios";

// Axios instance cho MVC endpoint (giống authService)
const authAxios = axios.create({
  baseURL: "http://localhost:5228",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  withCredentials: true,
  timeout: 10000,
});

// Key dùng để lưu thông tin mở rộng của user vào localStorage
const USER_PROFILE_KEY = "duybao_user_profile";

const userService = {
  /**
   * Lấy thông tin profile của user hiện tại.
   * Gọi API backend /Account/Profile (nếu có), nếu không thì fallback về localStorage.
   */
  getProfile: async () => {
    try {
      // Gọi API backend để lấy thông tin user (nếu endpoint tồn tại)
      const response = await axiosClient.get("/account/profile");
      return { success: true, data: response };
    } catch {
      // Fallback: lấy từ localStorage
      const cached = localStorage.getItem(USER_PROFILE_KEY);
      if (cached) {
        try {
          return { success: true, data: JSON.parse(cached) };
        } catch {
          // ignore
        }
      }
      return { success: true, data: null };
    }
  },

  /**
   * Cập nhật thông tin profile của user.
   * Gọi API backend PUT/POST /Account/Profile, nếu không thì lưu localStorage.
   */
  updateProfile: async (profileData) => {
    try {
      // Gửi lên API backend (nếu endpoint tồn tại)
      const response = await axiosClient.put("/account/profile", profileData);
      // Đồng thời lưu vào localStorage làm cache
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profileData));
      return { success: true, data: response };
    } catch (error) {
      // Nếu API chưa có, lưu tạm vào localStorage
      if (error.response && error.response.status === 404) {
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profileData));
        return { success: true, message: "Đã lưu thông tin (local)" };
      }
      console.error("Lỗi cập nhật profile:", error.message);
      return {
        success: false,
        error: "Không thể cập nhật thông tin. Vui lòng thử lại.",
      };
    }
  },

  /**
   * Đổi mật khẩu.
   * Gọi API backend POST /Account/ChangePassword
   */
  changePassword: async (oldPassword, newPassword) => {
    try {
      const params = new URLSearchParams();
      params.append("oldPassword", oldPassword);
      params.append("newPassword", newPassword);

      const response = await authAxios.post("/Account/ChangePassword", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error.message);
      return {
        success: false,
        error: "Không thể đổi mật khẩu. Vui lòng thử lại.",
      };
    }
  },

  /**
   * Lấy thông tin profile từ localStorage (sync).
   */
  getCachedProfile: () => {
    try {
      const cached = localStorage.getItem(USER_PROFILE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  },

  /**
   * Lưu profile vào localStorage (sync).
   */
  saveCachedProfile: (profileData) => {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profileData));
  },
};

export default userService;
