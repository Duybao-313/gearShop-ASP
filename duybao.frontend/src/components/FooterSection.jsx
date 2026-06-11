import React from 'react';

const FooterSection = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-3 mt-5">
            <div className="container">
                <div className="row">
                    {/* Company Info */}
                    <div className="col-lg-4 mb-4">
                        <h5 className="font-weight-bold text-uppercase mb-3">
                            <i className="fa-solid fa-crown text-primary mr-2"></i>ThaiCMS.Fashion
                        </h5>
                        <p className="text-muted small">
                            Hệ thống thời trang trực tuyến hàng đầu Việt Nam. Cam kết sản phẩm chính hãng, chất lượng cao.
                        </p>
                        <div className="text-muted small">
                            <p className="mb-1"><i className="fa-solid fa-location-dot mr-2"></i>123 Nguyễn Huệ, Quận 1, TP.HCM</p>
                            <p className="mb-1"><i className="fa-solid fa-phone mr-2"></i>0123 456 789</p>
                            <p className="mb-1"><i className="fa-regular fa-envelope mr-2"></i>support@thaicms.vn</p>
                        </div>
                    </div>

                    {/* Policy Links */}
                    <div className="col-lg-2 col-md-4 mb-4">
                        <h6 className="font-weight-bold text-uppercase mb-3">Chính Sách</h6>
                        <ul className="list-unstyled text-muted small">
                            <li className="mb-2"><a href="#" className="text-muted">Chính sách đổi trả</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Chính sách bảo mật</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Chính sách vận chuyển</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Hướng dẫn mua hàng</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-lg-2 col-md-4 mb-4">
                        <h6 className="font-weight-bold text-uppercase mb-3">Hỗ Trợ</h6>
                        <ul className="list-unstyled text-muted small">
                            <li className="mb-2"><a href="#" className="text-muted">Trung tâm trợ giúp</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Thanh toán</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Góp ý & khiếu nại</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Tuyển dụng</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-lg-4 col-md-4 mb-4">
                        <h6 className="font-weight-bold text-uppercase mb-3">Đăng Ký Nhận Tin</h6>
                        <p className="text-muted small">Nhận ưu đãi và xu hướng thời trang mới nhất qua email.</p>
                        <div className="input-group">
                            <input type="email" className="form-control form-control-sm" placeholder="Email của bạn..." />
                            <div className="input-group-append">
                                <button className="btn btn-primary btn-sm" type="button">Đăng ký</button>
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
                    <p className="mb-0">© 2026 ThaiCMS.Fashion - Đồ án thực hành ASP.NET Core Web API + ReactJS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
