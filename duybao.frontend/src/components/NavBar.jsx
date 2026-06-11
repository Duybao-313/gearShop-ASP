import React from 'react';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
                {/* Logo */}
                <a className="navbar-brand font-weight-bold text-uppercase text-primary" href="/" style={{ letterSpacing: '1px' }}>
                    <i className="fa-solid fa-crown mr-2"></i>ThaiCMS.Fashion
                </a>

                {/* Toggle for mobile */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Links */}
                <div className="collapse navbar-collapse" id="mainNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item active">
                            <a className="nav-link font-weight-medium px-3" href="/">Trang Chủ</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link font-weight-medium px-3" href="#">Cửa Hàng</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link font-weight-medium px-3" href="#">Tin Tức / Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link font-weight-medium px-3" href="#">Về Chúng Tôi</a>
                        </li>
                    </ul>

                    {/* Search & User Actions */}
                    <div className="d-flex align-items-center">
                        <a href="#" className="text-dark mr-3" title="Tìm kiếm">
                            <i className="fa-solid fa-search"></i>
                        </a>
                        <a href="#" className="text-dark mr-3" title="Đăng nhập">
                            <i className="fa-regular fa-user"></i>
                        </a>
                        <a href="#" className="text-dark position-relative" title="Giỏ hàng">
                            <i className="fa-solid fa-bag-shopping"></i>
                            <span className="badge badge-danger badge-pill position-absolute" style={{ top: '-8px', right: '-10px', fontSize: '10px' }}>0</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
