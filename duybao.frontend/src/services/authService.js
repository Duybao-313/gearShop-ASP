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
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    // MVC Login trả về Redirect (302) nếu thành công,
    // hoặc trả về View với ViewBag.Error nếu thất bại.
    // axios sẽ follow redirect → nhận HTML của trang đích.
    const response = await authAxios.post("/Account/Login", params, {
      maxRedirects: 0, // Không follow redirect để bắt 302
      validateStatus: (status) => status >= 200 && status <= 302,
    });

    if (response.status === 302) {
      // Đăng nhập thành công → server redirect
      return { success: true };
    }

    // Thất bại → server trả về 200 + HTML có lỗi
    const html = response.data;
    const errorMatch =
      typeof html === "string"
        ? html.match(/Tên đăng nhập hoặc mật khẩu không đúng/)
        : null;
    return {
      success: false,
      error: errorMatch
        ? "Tên đăng nhập hoặc mật khẩu không đúng!"
        : "Đăng nhập thất bại. Vui lòng thử lại.",
    };
  },

  // Kiểm tra trạng thái đăng nhập hiện tại
  checkAuth: async () => {
    try {
      const response = await authAxios.get("/Account/Login", {
        // Nếu đã login, GET /Account/Login sẽ redirect đến Category/Index
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status <= 302,
      });
      // Nếu redirect → đã login
      return { isAuthenticated: response.status === 302 };
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
};

export default authService;
