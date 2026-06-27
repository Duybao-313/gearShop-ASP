import React, { useState, useEffect } from "react";
import blogService from "../services/blogService";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await blogService.getAllPosts();
        setPosts(data || []);
      } catch (error) {
        console.error("Quá trình kết nối API bài viết thất bại:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Đang tải...</span>
        </div>
        <p className="text-muted mt-2">Đang tải bài viết...</p>
      </div>
    );
  }

  return (
    <div className="row">
      {posts.length === 0 ? (
        <div className="col-12 text-center py-5 text-muted">
          Chưa có bài viết nào.
        </div>
      ) : (
        posts.map((item) => (
          <div className="col-md-6 mb-4" key={item.id}>
            <div className="card blog-card h-100 shadow-sm border-0 rounded-lg overflow-hidden">
              <div className="blog-img-wrapper">
                <img
                  src={
                    item.imageUrl ||
                    "https://placehold.co/600x350/eee/999?text=Blog"
                  }
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="blog-date-badge">
                  <span className="d-block font-weight-bold">
                    {new Date(item.createdDate).getDate()}
                  </span>
                  <span className="d-block small">
                    {new Date(item.createdDate).toLocaleDateString("vi-VN", {
                      month: "short",
                    })}
                  </span>
                </div>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title font-weight-bold text-dark mb-2">
                  {item.title}
                </h5>
                <p className="card-text text-muted small flex-grow-1">
                  {item.shortDescription ||
                    "Nhấn để xem chi tiết bài viết chia sẻ về xu hướng phối đồ công sở..."}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <small className="text-muted">
                    <i className="fa-regular fa-calendar mr-1"></i>
                    {new Date(item.createdDate).toLocaleDateString("vi-VN")}
                  </small>
                  <a
                    href="#"
                    className="btn btn-outline-danger btn-sm rounded-pill px-3"
                  >
                    Đọc tiếp <i className="fa-solid fa-arrow-right ml-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
