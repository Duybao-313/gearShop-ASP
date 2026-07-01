import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import FooterSection from "./components/FooterSection";
import CartDrawer from "./components/CartDrawer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import CartPage from "./pages/CartPage";
import PayPage from "./pages/PayPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderDetailPage from "./pages/OrderDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import InformationPage from "./pages/InformationPage";
import "./App.css";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            {/* TOP BAR: Hotline & Support */}
            <TopBar />

            {/* NAVIGATION: Logo, Search, Menu, Cart */}
            <NavBar onCartClick={() => setCartOpen(true)} />

            {/* ROUTES */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/pay" element={<PayPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/orders/:id" element={<OrderDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/account" element={<InformationPage />} />
            </Routes>

            {/* FOOTER */}
            <FooterSection />

            {/* CART DRAWER (Slide-in từ phải) */}
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

            {/* TOAST NOTIFICATIONS */}
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 2500,
                style: {
                  fontSize: "14px",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                },
              }}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
