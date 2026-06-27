import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import LoginPage from "./pages/LoginPage";
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
              <Route path="/login" element={<LoginPage />} />
            </Routes>

            {/* FOOTER */}
            <FooterSection />

            {/* CART DRAWER (Slide-in từ phải) */}
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
