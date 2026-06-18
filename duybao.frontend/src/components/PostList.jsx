import React, { useState, useEffect } from "react";
import blogService from "../services/blogService";

const samplePosts = [
  {
    id: 1,
    title: "Bí quyết phối đồ công sở thanh lịch cho nữ",
    shortDescription:
      "Khám phá những bí quyết phối đồ công sở giúp bạn luôn thanh lịch và chuyên nghiệp trong mọi môi trường làm việc.",
    imageUrl: "https://placehold.co/600x350/ffe0e0/999?text=Thời+Trang+Nữ",
    createdDate: "2026-06-10T00:00:00",
  },
  {
    id: 2,
    title: "Xu hướng vest nam 2026 - Lịch lãm và hiện đại",
    shortDescription:
      "Cập nhật những xu hướng vest nam mới nhất năm 2026, từ chất liệu, màu sắc đến kiểu dáng thời thượng.",
    imageUrl: "https://placehold.co/600x350/e0e0ff/999?text=Vest+Nam+2026",
    createdDate: "2026-06-08T00:00:00",
  },
  {
    id: 3,
    title: "Đầm dạ hội - Lựa chọn hoàn hảo cho mọi sự kiện",
    shortDescription:
      "Cách chọn đầm dạ hội phù hợp với vóc dáng và phong cách, giúp bạn tỏa sáng trong mọi bữa tiệc sang trọng.",
    imageUrl: "https://placehold.co/600x350/ffe0ff/999?text=Đầm+Dạ+Hội",
    createdDate: "2026-06-05T00:00:00",
  },
  {
    id: 4,
    title: "Phong cách thời trang công sở bền vững",
    shortDescription:
      "Xu hướng thời trang bền vững đang len lỏi vào môi trường công sở, mang đến những lựa chọn thân thiện với môi trường.",
    imageUrl: "https://placehold.co/600x350/e0ffe0/999?text=Công+Sở+Bền+Vững",
    createdDate: "2026-06-03T00:00:00",
  },
];

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await blogService.getAllPosts();
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(samplePosts);
        }
      } catch (error) {
        console.error("Quá trình kết nối API bài viết thất bại:", error);
        setPosts(samplePosts);
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

  const displayPosts = posts.length > 0 ? posts : samplePosts;

  return (
    <div className="row">
      {displayPosts.map((item) => (
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
      ))}
    </div>
  );
};

export default PostList;
