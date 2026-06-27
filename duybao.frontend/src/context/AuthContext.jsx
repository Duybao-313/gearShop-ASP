import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import authService from "../services/authService";

const AuthContext = createContext();

const AUTH_STORAGE_KEY = "duybao_auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Khởi tạo: kiểm tra cookie còn hiệu lực không
  useEffect(() => {
    const init = async () => {
      try {
        const result = await authService.checkAuth();
        setIsAuthenticated(result.isAuthenticated);

        if (result.isAuthenticated) {
          // Khôi phục user từ localStorage hoặc từ backend response
          const cached = localStorage.getItem(AUTH_STORAGE_KEY);
          if (cached) {
            try {
              setUser(JSON.parse(cached));
            } catch {
              setUser({ username: result.username || "User" });
            }
          } else if (result.username) {
            const userData = { username: result.username };
            setUser(userData);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
          }
        } else {
          setUser(null);
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = useCallback(async (username, password) => {
    const result = await authService.login(username, password);

    if (result.success) {
      const userData = { username };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: result.error };
  }, []);

  // Cập nhật user sau khi đăng ký thành công (không cần gọi API login lại)
  const setUserAfterRegister = useCallback((username) => {
    const userData = { username };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    setUserAfterRegister,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
