import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../services/productService";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  // Đóng suggestions khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce search suggestions
  const fetchSuggestions = useCallback(async (value) => {
    if (!value || value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setLoading(true);
    try {
      const data = await productService.searchProducts(value.trim());
      setSuggestions((data || []).slice(0, 5));
      setShowSuggestions(true);
    } catch (err) {
      console.error("Lỗi tìm kiếm:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSearch = (searchQuery) => {
    const finalQuery = (searchQuery || query).trim();
    if (!finalQuery) return;
    setShowSuggestions(false);
    navigate(`/products?search=${encodeURIComponent(finalQuery)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <div className="search-bar-wrapper" ref={searchRef}>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar-input"
          placeholder="Tìm kiếm sản phẩm..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          aria-label="Tìm kiếm sản phẩm"
        />
        <button
          className="search-bar-btn"
          onClick={() => handleSearch()}
          title="Tìm kiếm"
          aria-label="Nút tìm kiếm"
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              style={{ width: "14px", height: "14px" }}
            ></span>
          ) : (
            <i className="fa-solid fa-search"></i>
          )}
        </button>
      </div>

      {/* Dropdown Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((product) => (
            <div
              key={product.id}
              className="search-suggestion-item"
              onClick={() => {
                setQuery(product.name);
                setShowSuggestions(false);
                navigate(`/products/${product.id}`);
              }}
            >
              <div className="suggestion-img">
                <img
                  src={product.imageUrl || "/placeholder.jpg"}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/40x40/1a1a1a/00ff88?text=G";
                  }}
                />
              </div>
              <div className="suggestion-info">
                <span className="suggestion-name">{product.name}</span>
                <span className="suggestion-price">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          ))}
          <div className="search-suggestion-all" onClick={() => handleSearch()}>
            <i className="fa-solid fa-magnifying-glass mr-2"></i>
            Xem tất cả kết quả cho "<strong>{query}</strong>"
          </div>
        </div>
      )}

      {showSuggestions &&
        query.length >= 2 &&
        !loading &&
        suggestions.length === 0 && (
          <div className="search-suggestions">
            <div className="search-no-result">
              <i className="fa-solid fa-circle-exclamation mr-2"></i>
              Không tìm thấy sản phẩm nào cho "{query}"
            </div>
          </div>
        )}
    </div>
  );
};

export default SearchBar;
