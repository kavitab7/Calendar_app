import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Header = () => {
    const navigate = useNavigate();
    const { state } = useContext(AppContext);

    // Get overdue and dueToday counts from the state
    const overdueCount = state.notifications.overdue.length;
    const dueTodayCount = state.notifications.dueToday.length;

    // Calculate total notifications
    const totalNotifications = overdueCount + dueTodayCount;

    const handleLogout = () => {
        sessionStorage.clear();
        alert("You have been logged out.");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">
                    COMMUNICATION MANAGER
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">
                                Admin
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user">
                                User
                            </Link>
                        </li>
                        <li className="nav-item position-relative">
                            <Link className="nav-link" to="/notifications">
                                <i className="bi bi-bell" ></i>
                                {totalNotifications > 0 && (
                                    <span
                                        className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                                        style={{ fontSize: "0.75rem" }}
                                    >
                                        {totalNotifications}
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="userDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                User
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
