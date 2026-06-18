import React from "react";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import BannerSection from "./components/BannerSection";
import CategoryProductList from "./components/CategoryProductList";
import BlogCategoryList from "./components/BlogCategoryList";
import ProductList from "./components/ProductList";
import PostList from "./components/PostList";
import FooterSection from "./components/FooterSection";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* TOP BAR: Hotline & Support */}
      <TopBar />

      {/* NAVIGATION: Logo, Search, Menu */}
      <NavBar />

      {/* BANNER: Hero section */}
      <BannerSection />

      {/* MAIN CONTENT */}
      <main className="py-4">
        {/* PRODUCT CATEGORIES: Horizontal bar */}
        <div className="container">
          <CategoryProductList />
        </div>

        {/* FEATURED PRODUCTS: Centered full width */}
        <div className="container py-4">
          <h4 className="section-title font-weight-bold text-dark text-uppercase">
            <i className="fa-solid fa-star text-warning mr-2"></i>Sản Phẩm Nổi
            Bật
          </h4>
          <ProductList />
        </div>

        {/* BLOG / FASHION TRENDS SECTION */}
        <section className="bg-light mt-4 py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <h3 className="section-title font-weight-bold text-dark text-uppercase mb-5">
                  <i className="fa-solid fa-newspaper text-danger mr-2"></i>Xu
                  Hướng Thời Trang
                </h3>
                <PostList />
              </div>
              <div className="col-lg-4">
                <BlogCategoryList />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <FooterSection />
    </div>
  );
}

export default App;
