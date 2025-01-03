import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/Admin/AdminDashboard";
import CompanyManagement from "../components/Admin/CompanyManagement";
import CommunicationMethodManagement from "../components/Admin/CommunicationMethodManagement";

const AdminPage = () => {
    return (
        <div className="container mt-5">
            <AdminDashboard />
            <div className="my-4">
                <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="company-management" element={<CompanyManagement />} />
                    <Route path="communication-method-management" element={<CommunicationMethodManagement />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminPage;
