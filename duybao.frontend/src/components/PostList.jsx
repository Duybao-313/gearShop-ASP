import React, { useState, useEffect } from "react";
import blogService from "../services/blogService";

const PostList = () => {
  // 1. Khai báo State chứa mảng bài viết lấy từ SQL Server
  const [posts, setPosts] = useState([]);

  // Khai báo State quản lý trạng thái chờ (Loading) nhằm tối ưu trải nghiệm người dùng
  const [loading, setLoading] = useState(true);

  // 2. Sử dụng useEffect để kiểm soát vòng đời gọi dữ liệu
  useEffect(() => {
    // Viết hàm bất đồng bộ để đợi dữ liệu từ Server truyền về
    const fetchPosts = async () => {
      try {
        setLoading(true); // Bắt đầu tải

        // Gọi sang lớp Service để kích hoạt Axios lấy dữ liệu JSON
        const data = await blogService.getAllPosts();

        // Nạp cục dữ liệu JSON vừa lấy vào State 'posts'
        setPosts(data);
      } catch (error) {
        console.error("Quá trình kết nối API bài viết thất bại:", error);
      } finally {
        setLoading(false); // Kết thúc tải dữ liệu (Dù thành công hay thất bại)
      }
    };
    // Kích hoạt hàm thực thi
    fetchPosts();
  }, []); // Mảng rỗng [] ở đây cực kỳ quan trọng: Đảm bảo API chỉ gọi 1 LẦN DUY NHẤT khi mở trang

  // 3. Xử lý trạng thái hiển thị giao diện tạm thời
  if (loading) {
    return (
      <div className="text-center my-4">
        Đang kết nối Database lấy tin tức thời trang...
      </div>
    );
  }

  // 4. Render giao diện HTML/Bootstrap khi đã có dữ liệu thành công
  return (
    <div>
      <h3 className="font-weight-bold text-dark mb-4">
        <i className="fa-solid fa-newspaper mr-2"></i> Xu hướng & Bí quyết mặc
        đẹp
      </h3>

      {posts.length === 0 ? (
        <div className="text-center py-5 text-muted">
          Hiện tại chưa có bài viết xu hướng nào trong hệ thống.
        </div>
      ) : (
        <div className="row">
          {posts.map((item) => (
            <div className="col-md-6 mb-4" key={item.id}>
              <div className="card h-100 shadow-sm border-0 rounded-lg">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title font-weight-bold text-dark">
                    {item.title}
                  </h5>

                  {/* Hiển thị đoạn mô tả ngắn trích dẫn */}
                  <p className="card-text text-muted small flex-grow-1">
                    {item.shortDescription ||
                      "Nhấn để xem chi tiết bài viết chia sẻ về xu hướng phối đồ công sở..."}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <small className="text-muted">
                      <i className="fa-regular fa-calendar mr-1"></i>
                      {/* Định dạng lại chuỗi DateTime thô của SQL thành ngày thuần Việt */}
                      {new Date(item.createdDate).toLocaleDateString("vi-VN")}
                    </small>
                    <a href="#" className="btn btn-outline-primary btn-sm">
                      Đọc tiếp <i className="fa-solid fa-arrow-right ml-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
