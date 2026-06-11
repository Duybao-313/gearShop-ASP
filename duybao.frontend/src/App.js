import React from 'react';
import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import BannerSection from './components/BannerSection';
import CategoryProductList from './components/CategoryProductList';
import BlogCategoryList from './components/BlogCategoryList';
import ProductList from './components/ProductList';
import PostList from './components/PostList';
import FooterSection from './components/FooterSection';
import './App.css';

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
      <main className="container py-4">
        <div className="row">
          {/* LEFT COLUMN: Categories & Blog Topics */}
          <aside className="col-lg-3 mb-4">
            <CategoryProductList />
            <BlogCategoryList />
          </aside>

          {/* RIGHT COLUMN: Featured Products & Blog */}
          <section className="col-lg-9">
            {/* Category Filter Tabs */}
            <div className="d-flex flex-wrap mb-4">
              <span className="category-tab active rounded-pill px-3 py-1 mr-2 mb-2 small font-weight-medium">Tất cả sản phẩm</span>
              <span className="category-tab rounded-pill px-3 py-1 mr-2 mb-2 small font-weight-medium">Trang phục nữ</span>
              <span className="category-tab rounded-pill px-3 py-1 mr-2 mb-2 small font-weight-medium">Vest & áo nam</span>
              <span className="category-tab rounded-pill px-3 py-1 mr-2 mb-2 small font-weight-medium">Đầm dạ hội</span>
              <span className="category-tab rounded-pill px-3 py-1 mr-2 mb-2 small font-weight-medium">Thời trang công sở</span>
            </div>

            {/* Featured Products */}
            <h4 className="section-title font-weight-bold text-dark text-uppercase">
              <i className="fa-solid fa-star text-warning mr-2"></i>Sản Phẩm Nổi Bật
            </h4>
            <ProductList />
          </section>
        </div>

        {/* BLOG / FASHION TRENDS SECTION */}
        <section className="mt-5 pt-4 border-top">
          <h3 className="section-title font-weight-bold text-dark text-uppercase text-center mb-5">
            <i className="fa-solid fa-newspaper text-danger mr-2"></i>Xu Hướng Thời Trang
          </h3>
          <PostList />
        </section>
      </main>

      {/* FOOTER */}
      <FooterSection />
    </div>
  );
}

export default App;
