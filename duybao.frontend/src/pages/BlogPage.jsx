import React, { useState, useEffect, useMemo } from "react";
import blogService from "../services/blogService";
import BlogFeatured from "../components/BlogFeatured";
import BlogCard from "../components/BlogCard";
import BlogNewsletter from "../components/BlogNewsletter";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 9;

const BlogPage = () => {
  // === STATE ===
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // === FETCH DATA ===
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await blogService.getAllPosts();
        setPosts(data || []);
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
        setError("Không thể tải danh sách bài viết. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await blogService.getBlogCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Lỗi khi tải danh mục bài viết:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchPosts();
    fetchCategories();
  }, []);

  // === FILTER POSTS ===
  const filteredPosts = useMemo(() => {
    if (activeCategory === null) return posts;
    return posts.filter((post) => post.categoryId === activeCategory);
  }, [posts, activeCategory]);

  // Featured = bài đầu tiên trong danh sách đã lọc
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;

  // Grid posts = phần còn lại (bỏ featured)
  const gridPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.slice(1);
  }, [filteredPosts, featuredPost]);

  // === PHÂN TRANG ===
  const totalPages = Math.max(1, Math.ceil(gridPosts.length / ITEMS_PER_PAGE));

  // Reset page khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return gridPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [gridPosts, currentPage]);

  // === HANDLERS ===
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // ================================================================
  // RENDER: LOADING
  // ================================================================
  if (loading) {
    return (
      <main>
        <div className="container py-5">
          <div className="mb-4 pb-3 border-bottom">
            <span
              className="badge badge-dark px-3 py-1 mb-2 text-uppercase"
              style={{ letterSpacing: "2px", fontSize: "10px" }}
            >
              THE PRECISION JOURNAL
            </span>
            <h1
              className="font-weight-bold text-dark mb-0 text-uppercase"
              style={{ fontSize: "42px", letterSpacing: "-1px" }}
            >
              Blog &amp; Tin Tức
            </h1>
          </div>
          <div className="text-center py-5">
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only">Đang tải...</span>
            </div>
            <p className="text-muted mt-2">Đang tải bài viết...</p>
          </div>
        </div>
      </main>
    );
  }

  // ================================================================
  // RENDER: ERROR
  // ================================================================
  if (error) {
    return (
      <main>
        <div className="container py-5">
          <div className="mb-4 pb-3 border-bottom">
            <span
              className="badge badge-dark px-3 py-1 mb-2 text-uppercase"
              style={{ letterSpacing: "2px", fontSize: "10px" }}
            >
              THE PRECISION JOURNAL
            </span>
            <h1
              className="font-weight-bold text-dark mb-0 text-uppercase"
              style={{ fontSize: "42px", letterSpacing: "-1px" }}
            >
              Blog &amp; Tin Tức
            </h1>
          </div>
          <div className="text-center py-5">
            <i className="fa-solid fa-triangle-exclamation fa-3x text-muted mb-3 d-block"></i>
            <p className="text-muted">{error}</p>
            <button
              className="btn btn-outline-dark mt-2"
              onClick={() => window.location.reload()}
            >
              <i className="fa-solid fa-rotate mr-2"></i>Thử lại
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ================================================================
  // RENDER: MAIN
  // ================================================================
  return (
    <main>
      <div className="container py-5">
        {/* ===== PAGE HEADER ===== */}
        <div className="mb-4 pb-3 border-bottom">
          <span
            className="badge badge-dark px-3 py-1 mb-2 text-uppercase"
            style={{ letterSpacing: "2px", fontSize: "10px" }}
          >
            THE PRECISION JOURNAL
          </span>
          <h1
            className="font-weight-bold text-dark mb-0 text-uppercase"
            style={{ fontSize: "42px", letterSpacing: "-1px" }}
          >
            Blog &amp; Tin Tức
          </h1>
        </div>

        {/* ===== FILTER BAR ===== */}
        {!loadingCategories && categories.length > 0 && (
          <div className="d-flex flex-wrap align-items-center gap-2 mb-4 pb-4 border-bottom">
            <button
              className={`btn btn-sm text-uppercase font-weight-bold ${
                activeCategory === null ? "btn-dark text-white" : "btn-outline-dark"
              }`}
              style={{ letterSpacing: "1px", fontSize: "11px", padding: "8px 20px" }}
              onClick={() => handleCategoryChange(null)}
            >
              TẤT CẢ
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`btn btn-sm text-uppercase ${
                  activeCategory === cat.id
                    ? "btn-dark text-white font-weight-bold"
                    : "btn-outline-dark"
                }`}
                style={{ letterSpacing: "1px", fontSize: "11px", padding: "8px 20px" }}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.name}
              </button>
            ))}
            <span className="ml-auto text-muted" style={{ fontSize: "13px" }}>
              {filteredPosts.length} bài viết
            </span>
          </div>
        )}

        {/* ===== EMPTY STATE ===== */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-5">
            <i className="fa-solid fa-newspaper fa-4x text-muted mb-3 d-block"></i>
            <h5 className="text-muted font-weight-bold">
              Chưa có bài viết nào
            </h5>
            <p className="text-muted">
              {activeCategory
                ? "Danh mục này hiện chưa có bài viết. Vui lòng chọn danh mục khác."
                : "Hiện chưa có bài viết nào được đăng. Hãy quay lại sau!"}
            </p>
            {activeCategory && (
              <button
                className="btn btn-outline-dark btn-sm text-uppercase"
                onClick={() => handleCategoryChange(null)}
              >
                <i className="fa-solid fa-arrow-left mr-1"></i>Xem tất cả
              </button>
            )}
          </div>
        ) : (
          <>
            {/* ===== FEATURED POST ===== */}
            {featuredPost && <BlogFeatured post={featuredPost} />}

            {/* ===== POST GRID ===== */}
            {paginatedPosts.length > 0 && (
              <section>
                <div className="d-flex justify-content-between align-items-end mb-4 pb-3 border-bottom">
                  <div>
                    <span
                      className="badge badge-dark px-3 py-1 mb-2 text-uppercase"
                      style={{ letterSpacing: "2px", fontSize: "10px" }}
                    >
                      {activeCategory
                        ? categories.find((c) => c.id === activeCategory)
                            ?.name || "Bài viết"
                        : "MỚI NHẤT"}
                    </span>
                    <h2 className="font-weight-bold text-dark mb-0">BÀI VIẾT</h2>
                  </div>
                </div>

                <div className="row">
                  {paginatedPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </section>
            )}

            {/* Nếu chỉ có 1 bài (featured) và không có grid posts */}
            {gridPosts.length === 0 && (
              <div className="text-center text-muted py-4">
                <p>
                  Chỉ có 1 bài viết trong mục này. Hãy quay lại sau để đọc thêm!
                </p>
              </div>
            )}
          </>
        )}

        {/* ===== NEWSLETTER ===== */}
        <BlogNewsletter />
      </div>
    </main>
  );
};

export default BlogPage;