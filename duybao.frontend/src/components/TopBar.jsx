import React from 'react';

const TopBar = () => {
    return (
        <div className="bg-dark text-white py-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center text-md-left">
                        <small>
                            <i className="fa-solid fa-phone mr-1"></i> Hotline: 0123 456 789 |
                            <i className="fa-regular fa-envelope ml-2 mr-1"></i> support@thaicms.vn
                        </small>
                    </div>
                    <div className="col-md-6 text-center text-md-right">
                        <small>
                            <i className="fa-regular fa-clock mr-1"></i> Giờ làm việc: 8:00 - 22:00 (T2 - CN)
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
