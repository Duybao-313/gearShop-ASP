import React, { useState, useEffect } from "react";
import blogService from "../services/blogService";

const BlogCategoryList = () => {
  // Kho lưu trữ danh sách chuyên mục bài viết lấy từ SQL Server
  const [blogCategories, setBlogCategories] = useState([]);
  // Trạng thái tối ưu trải nghiệm người dùng trong lúc đợi API phản hồi
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogCategories = async () => {
      try {
        setLoading(true);
        // Gọi sang lớp Service chứa trục Axios tập trung
        const data = await blogService.getBlogCategories();
        setBlogCategories(data); // Đẩy dữ liệu JSON nhận được vào State
      } catch (error) {
        console.error("Lỗi hệ thống khi gọi API chuyên mục tin tức:", error);
      } finally {
        setLoading(false); // Đóng trạng thái Loading
      }
    };

    fetchBlogCategories();
  }, []); // Mảng rỗng đảm bảo không xảy ra vòng lặp render vô hạn làm treo trình duyệt

  if (loading) {
    return (
      <div className="text-center my-3">
        Đang nạp các chuyên mục bài viết...
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 rounded-lg mt-4">
      <div className="card-header bg-white border-bottom-0 pt-4 pb-2 px-4">
        <h5
          className="card-title text-uppercase font-weight-bold text-dark d-flex align-items-center mb-0"
          style={{ letterSpacing: "0.5px", fontSize: "1.1rem" }}
        >
          <i
            className="fa-solid fa-tags text-success mr-2"
            style={{ fontSize: "1.3rem" }}
          ></i>{" "}
          Chủ đề bài viết
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {blogCategories.length === 0 ? (
            <div className="p-4 text-center text-muted">
              Chưa có chủ đề tin tức nào.
            </div>
          ) : (
            blogCategories.map((cate) => (
              <a
                key={cate.id}
                href="#"
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-4 py-3"
                style={{ fontSize: "0.95rem", color: "#495057" }}
              >
                <span className="font-weight-normal">{cate.name}</span>
                <span className="badge badge-success badge-pill">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCategoryList;
