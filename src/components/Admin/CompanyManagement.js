import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { getCompanies } from "../../services/communicationService";

const CompanyManagement = () => {
    const { state, dispatch } = useContext(AppContext);
    const [newCompany, setNewCompany] = useState({
        name: "",
        location: "",
        contact: "",
        linkedin: "",
        phoneNumbers: [],
        emails: [],
        comments: "",
        communicationPeriodicity: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [editingCompanyId, setEditingCompanyId] = useState(null);
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (state.companies.length === 0) {
            getCompanies()
                .then((companies) => {
                    dispatch({ type: "SET_COMPANIES", payload: companies });
                })
                .catch(() => setErrorMessage("Failed to load companies."));
        }
    }, [dispatch, state.companies.length]);

    const handleAddCompany = () => {
        if (!newCompany.name || !newCompany.location || !newCompany.contact) {
            setErrorMessage("Name, location, and contact are required!");
            return;
        }

        if (isEdit) {
            dispatch({
                type: "UPDATE_COMPANY",
                payload: { id: editingCompanyId, ...newCompany },
            });
            setIsEdit(false);
            setEditingCompanyId(null);
        } else {
            dispatch({
                type: "ADD_COMPANY",
                payload: { id: Date.now(), ...newCompany },
            });
        }

        setNewCompany({
            name: "",
            location: "",
            contact: "",
            linkedin: "",
            phoneNumbers: [],
            emails: [],
            comments: "",
            communicationPeriodicity: "",
        });
        setErrorMessage("");
        nameInputRef.current.focus();
    };

    const handleEditCompany = (company) => {
        setNewCompany(company);
        setIsEdit(true);
        setEditingCompanyId(company.id);
    };

    const handleDeleteCompany = (id) => {
        if (window.confirm("Are you sure you want to delete this company?")) {
            dispatch({ type: "DELETE_COMPANY", payload: id });
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-5 fw-bold">Company Management</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="card shadow-lg p-4 rounded">
                        <h5 className="card-title text-primary text-center">{isEdit ? "Edit Company" : "Add New Company"}</h5>
                        <div className="mb-3">
                            <input
                                ref={nameInputRef}
                                type="text"
                                className="form-control mb-2"
                                placeholder="Company Name"
                                value={newCompany.name}
                                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Location"
                                value={newCompany.location}
                                onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Contact Email"
                                value={newCompany.contact}
                                onChange={(e) => setNewCompany({ ...newCompany, contact: e.target.value })}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="LinkedIn Profile URL"
                                value={newCompany.linkedin}
                                onChange={(e) => setNewCompany({ ...newCompany, linkedin: e.target.value })}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Communication Periodicity"
                                value={newCompany.communicationPeriodicity}
                                onChange={(e) => setNewCompany({ ...newCompany, communicationPeriodicity: e.target.value })}
                            />
                            <button className="btn btn-primary w-100" onClick={handleAddCompany}>
                                {isEdit ? "Update Company" : "Add Company"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Company Name</th>
                                <th>Location</th>
                                <th>Contact</th>
                                <th>LinkedIn</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(state.companies) && state.companies.map((company, index) => (
                                <tr key={company.id}>
                                    <td>{index + 1}</td>
                                    <td>{company.name}</td>
                                    <td>{company.location}</td>
                                    <td>{company.contact}</td>
                                    <td>
                                        <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary">
                                            LinkedIn Profile
                                        </a>
                                    </td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEditCompany(company)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCompany(company.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompanyManagement;
