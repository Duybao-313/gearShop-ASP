import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Tạo mảng số trang để hiển thị
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = Math.min(maxVisible, totalPages - 1);
      }
      if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - maxVisible + 1);
      }

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 pt-4 border-top">
      <div className="d-flex align-items-center" style={{ gap: "4px" }}>
        {/* Prev */}
        <button
          className="btn btn-sm btn-outline-dark d-flex align-items-center justify-content-center"
          style={{ width: "36px", height: "36px", padding: 0 }}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          title="Trang trước"
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ fontSize: "12px" }}
          ></i>
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span
              key={`dots-${idx}`}
              className="text-muted px-1"
              style={{ fontSize: "13px" }}
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`btn btn-sm d-flex align-items-center justify-content-center ${
                currentPage === page
                  ? "btn-dark text-white"
                  : "btn-light text-dark"
              }`}
              style={{
                width: "36px",
                height: "36px",
                padding: 0,
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
              onClick={() => onPageChange(page)}
            >
              {String(page).padStart(2, "0")}
            </button>
          ),
        )}

        {/* Next */}
        <button
          className="btn btn-sm btn-outline-dark d-flex align-items-center justify-content-center"
          style={{ width: "36px", height: "36px", padding: 0 }}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          title="Trang sau"
        >
          <i
            className="fa-solid fa-chevron-right"
            style={{ fontSize: "12px" }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
