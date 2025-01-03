import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-60">
            <h1 className="text-center mb-5 fw-bold">Admin Dashboard</h1>
            <div className="row justify-content-center gy-4 w-100">
                <div className="col-10 col-md-5">
                    <div className="card text-center shadow-lg p-3 h-100 border-0 rounded">
                        <div className="card-body">
                            <h5 className="card-title fw-bold text-primary">Manage Companies</h5>
                            <p className="card-text text-muted">
                                Add, update, or delete company information, including locations,
                                emails, and phone numbers.
                            </p>
                            <Link to="/admin/company-management" className="btn btn-outline-primary">
                                Company Management
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-10 col-md-5">
                    <div className="card text-center shadow-lg p-3 h-100 border-0 rounded">
                        <div className="card-body">
                            <h5 className="card-title fw-bold text-success">Manage Communication Methods</h5>
                            <p className="card-text text-muted">
                                Configure and update communication methods, including sequences
                                and mandatory flags.
                            </p>
                            <Link
                                to="/admin/communication-method-management"
                                className="btn btn-outline-success"
                            >
                                Communication Methods
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
