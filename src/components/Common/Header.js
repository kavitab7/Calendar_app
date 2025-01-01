import React from "react";

const Header = () => {
    return (
        <header className="bg-primary text-white py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="h3 mb-0">Calendar Communication Tracker</h1>
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/admin">
                                Admin
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/user">
                                User
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/reports">
                                Reports
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
