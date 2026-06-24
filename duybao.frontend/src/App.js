import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import FooterSection from "./components/FooterSection";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BlogPage from "./pages/BlogPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* TOP BAR: Hotline & Support */}
        <TopBar />

        {/* NAVIGATION: Logo, Search, Menu */}
        <NavBar />

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>

        {/* FOOTER */}
        <FooterSection />
      </div>
    </Router>
  );
}

export default App;
