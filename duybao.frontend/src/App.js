import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import FooterSection from "./components/FooterSection";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
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
        </Routes>

        {/* FOOTER */}
        <FooterSection />
      </div>
    </Router>
  );
}

export default App;
