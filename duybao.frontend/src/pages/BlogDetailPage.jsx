import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import blogService from "../services/blogService";
import BlogDetailHero from "../components/BlogDetailHero";
import BlogDetailContent from "../components/BlogDetailContent";
import BlogDetailSidebar from "../components/BlogDetailSidebar";

/**
 * BlogDetailPage — Trang chi tiết bài viết
 * Lấy ID từ URL, gọi API /api/posts/{id}, hiển thị nội dung bài viết
 */
const BlogDetailPage = () => {
  const { id } = useParams();

  // === STATE ===
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === FETCH POST CHÍNH (bắt buộc) ===
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const postData = await blogService.getPostById(id);

        if (!postData || !postData.id) {
          setError("Không tìm thấy bài viết.");
          setLoading(false);
          return;
        }

        setPost(postData);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết bài viết:", err);
        setError("Không thể tải bài viết. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
      window.scrollTo(0, 0);
    }
  }, [id]);

  // === FETCH PHỤ: danh mục + bài viết liên quan (không block page) ===
  useEffect(() => {
    if (!post || !post.id) return;

    const fetchSidebar = async () => {
      try {
        const [categoriesData, allPostsData] = await Promise.all([
          blogService.getBlogCategories(),
          blogService.getAllPosts(),
        ]);

        setCategories(categoriesData || []);

        const related = (allPostsData || [])
          .filter(
            (p) =>
              p.id !== post.id &&
              p.categoryId === post.categoryId
          )
          .slice(0, 4);
        setRelatedPosts(related);
      } catch (err) {
        console.error("Lỗi khi tải sidebar:", err);
        // Không set error - sidebar là optional
      }
    };

    fetchSidebar();
  }, [post]);

  // ================================================================
  // RENDER: LOADING
  // ================================================================
  if (loading) {
    return (
      <main>
        <div className="container py-5">
          <div className="text-center py-5">
            <div
              className="spinner-border text-dark"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="sr-only">Đang tải...</span>
            </div>
            <p
              className="mt-3 text-muted text-uppercase"
              style={{ letterSpacing: "1px", fontSize: "13px" }}
            >
              Đang tải bài viết...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ================================================================
  // RENDER: ERROR
  // ================================================================
  if (error || !post) {
    return (
      <main>
        <div className="container py-5">
          <div className="text-center py-5">
            <i
              className="fa-solid fa-triangle-exclamation text-muted mb-3 d-block"
              style={{ fontSize: "3rem", opacity: 0.3 }}
            ></i>
            <h5 className="text-muted text-uppercase" style={{ letterSpacing: "1px" }}>
              {error || "Không tìm thấy bài viết."}
            </h5>
            <Link
              to="/blog"
              className="btn btn-dark mt-3 text-uppercase"
              style={{ letterSpacing: "1px", fontSize: "13px" }}
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>Quay Lại Blog
            </Link>
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
      <div className="container py-4 py-md-5">
        <div className="row">
          {/* ===== LEFT: NỘI DUNG CHÍNH ===== */}
          <div className="col-lg-8">
            {/* Hero: breadcrumb + tiêu đề + metadata */}
            <BlogDetailHero post={post} />

            {/* Nội dung HTML + ảnh đại diện */}
            <BlogDetailContent post={post} />
          </div>

          {/* ===== RIGHT: SIDEBAR ===== */}
          <div className="col-lg-4">
            <BlogDetailSidebar
              post={post}
              categories={categories}
              relatedPosts={relatedPosts}
            />
          </div>
        </div>
      </div>

      {/* Spacing bottom */}
      <div className="py-3"></div>
    </main>
  );
};

export default BlogDetailPage;
