import React from "react";

const BlogNewsletter = () => {
  return (
    <section className="mt-5 pt-5 border-top">
      <div className="card border-0 bg-dark text-white text-center p-5">
        <span
          className="badge badge-light text-dark px-3 py-1 mx-auto mb-3 text-uppercase"
          style={{ letterSpacing: "2px", fontSize: "10px", width: "fit-content" }}
        >
          Luôn Cập Nhật
        </span>
        <h2
          className="font-weight-bold mb-3 text-uppercase"
          style={{ letterSpacing: "1px" }}
        >
          Đăng Ký Nhận Bài Viết Mới
        </h2>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: "500px", fontSize: "14px" }}>
          Nhận thông báo về bài viết mới nhất, hướng dẫn custom gear và review
          sản phẩm mỗi tuần. Không spam.
        </p>

        <form
          className="d-flex mx-auto"
          style={{ maxWidth: "480px", width: "100%" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            className="form-control form-control-lg rounded-0 border-0"
            placeholder="Nhập email của bạn..."
            style={{ fontSize: "14px" }}
          />
          <button
            type="submit"
            className="btn btn-light btn-lg rounded-0 text-dark text-uppercase font-weight-bold"
            style={{ letterSpacing: "1px", fontSize: "12px" }}
          >
            ĐĂNG KÝ
          </button>
        </form>
        <p
          className="mt-3 mb-0"
          style={{ fontSize: "10px", letterSpacing: "2px" }}
        >
          TẦN SUẤT: 1 EMAIL / TUẦN. KHÔNG RÁC.
        </p>
      </div>
    </section>
  );
};

export default BlogNewsletter;
