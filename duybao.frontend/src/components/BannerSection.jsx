import React from 'react';

const BannerSection = () => {
    return (
        <section className="bg-light">
            <div className="container">
                <div className="row align-items-center" style={{ minHeight: '350px' }}>
                    <div className="col-lg-6 py-5">
                        <span className="badge badge-danger px-3 py-2 mb-3">Bộ Sưu Tập Mới 2026</span>
                        <h1 className="display-4 font-weight-bold text-dark">
                            Thời Trang <span className="text-primary">Công Sở</span> & Dạ Hội
                        </h1>
                        <p className="lead text-muted my-4">
                            Khám phá bộ sưu tập mới nhất với những thiết kế tinh tế, sang trọng dành cho quý ông và quý cô hiện đại.
                        </p>
                        <div className="d-flex flex-wrap gap-2">
                            <a href="#" className="btn btn-primary btn-lg rounded-pill px-4 mr-2 shadow-sm">
                                <i className="fa-solid fa-bag-shopping mr-2"></i>Mua Ngay
                            </a>
                            <a href="#" className="btn btn-outline-dark btn-lg rounded-pill px-4">
                                <i className="fa-regular fa-eye mr-2"></i>Xem Bộ Sưu Tập
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center d-none d-lg-block">
                        <div className="p-4">
                            <i className="fa-solid fa-tshirt text-primary" style={{ fontSize: '12rem', opacity: 0.15 }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
