import React from 'react';

const FooterSection = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-3 mt-5">
            <div className="container">
                <div className="row">
                    {/* Company Info */}
                    <div className="col-lg-4 mb-4">
                        <h5 className="font-weight-bold text-uppercase mb-3"
                            style={{ letterSpacing: "2px" }}>
                            <i className="fa-solid fa-microchip mr-2"></i>GEAR TECH
                        </h5>
                        <p className="text-muted small" style={{ maxWidth: "280px" }}>
                            Phần cứng gaming precision-engineered dành cho game thủ chuyên nghiệp. Hiệu năng đỉnh cao, thiết kế tối giản.
                        </p>
                        <div className="text-muted small">
                            <p className="mb-1"><i className="fa-solid fa-location-dot mr-2"></i>1200 Tech Plaza, Floor 42, San Francisco</p>
                            <p className="mb-1"><i className="fa-solid fa-phone mr-2"></i>0123 456 789</p>
                            <p className="mb-1"><i className="fa-regular fa-envelope mr-2"></i>support@geartech.vn</p>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="col-lg-2 col-md-4 mb-4">
                        <h6 className="font-weight-bold text-uppercase mb-3" style={{ letterSpacing: "1px" }}>Shop</h6>
                        <ul className="list-unstyled text-muted small">
                            <li className="mb-2"><a href="#" className="text-muted">Chuột Gaming</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Bàn Phím Cơ</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Tai Nghe</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Màn Hình</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Linh Kiện</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-lg-2 col-md-4 mb-4">
                        <h6 className="font-weight-bold text-uppercase mb-3" style={{ letterSpacing: "1px" }}>Hỗ Trợ</h6>
                        <ul className="list-unstyled text-muted small">
                            <li className="mb-2"><a href="#" className="text-muted">Bảo Hành</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Vận Chuyển</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Liên Hệ</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Sitemap</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-lg-4 col-md-4 mb-4">
                        <h6 className="font-weight-bold text-uppercase mb-3" style={{ letterSpacing: "1px" }}>Đăng Ký Nhận Tin</h6>
                        <p className="text-muted small">Nhận thông báo sớm về sản phẩm mới, firmware updates và insights gaming.</p>
                        <div className="input-group">
                            <input type="email" className="form-control form-control-sm" placeholder="Email của bạn..." />
                            <div className="input-group-append">
                                <button className="btn btn-light btn-sm text-dark" type="button">Đăng ký</button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <a href="#" className="text-white mr-3"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="text-white mr-3"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#" className="text-white mr-3"><i className="fa-brands fa-tiktok"></i></a>
                            <a href="#" className="text-white"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>
                </div>

                <hr className="border-secondary" />
                <div className="text-center text-muted small">
                    <p className="mb-0">&copy; 2026 GEAR TECH PRECISION. ALL RIGHTS RESERVED. &mdash; Đồ án ASP.NET Core + ReactJS.</p>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
