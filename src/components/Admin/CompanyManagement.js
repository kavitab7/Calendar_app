import React, { useState } from 'react'
import { actions, useAppContext } from '../../context/AppContext'

const CompanyManagement = () => {
    const { state, dispatch } = useAppContext();
    const { companies } = state;

    const [company, setCompany] = useState({
        name: "",
        location: "",
        linkedInProfile: "",
        emails: "",
        phoneNumbers: "",
        comments: "",
        communicationPeriodicity: "",
    })

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany({ ...company, [name]: value });
    }

    //add or update company
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch({
                type: actions.UPDATE_COMPANY,
                payload: { id: editId, ...company },
            });
            setIsEditing(false);
            setEditId(null);
        } else {
            dispatch({
                type: actions.ADD_COMPANY,
                payload: { id: Date.now(), ...company },
            })
        }
        setCompany({
            name: "",
            location: "",
            linkedInProfile: "",
            emails: "",
            phoneNumbers: "",
            comments: "",
            communicationPeriodicity: "",
        })
    }

    //edit a company 
    const handleEdit = (id) => {
        const existingCompany = companies.find((comp) => comp.id);
        setCompany(existingCompany)
        setIsEditing(true);
        setEditId(id)
    }

    //delete a company 
    const handleDelete = (id) => {
        dispatch({
            type: actions.DELETE_COMPANY, payload: id
        })
    }
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Company Management</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                            Company Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={company.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="location" className="form-label">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            className="form-control"
                            value={company.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="linkedInProfile" className="form-label">
                            LinkedIn Profile
                        </label>
                        <input
                            type="url"
                            id="linkedInProfile"
                            name="linkedInProfile"
                            className="form-control"
                            value={company.linkedInProfile}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="emails" className="form-label">
                            Emails
                        </label>
                        <input
                            type="text"
                            id="emails"
                            name="emails"
                            className="form-control"
                            value={company.emails}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phoneNumbers" className="form-label">
                            Phone Numbers
                        </label>
                        <input
                            type="text"
                            id="phoneNumbers"
                            name="phoneNumbers"
                            className="form-control"
                            value={company.phoneNumbers}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="communicationPeriodicity" className="form-label">
                            Communication Periodicity (e.g., 2 weeks)
                        </label>
                        <input
                            type="text"
                            id="communicationPeriodicity"
                            name="communicationPeriodicity"
                            className="form-control"
                            value={company.communicationPeriodicity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="comments" className="form-label">
                            Comments
                        </label>
                        <textarea
                            id="comments"
                            name="comments"
                            className="form-control"
                            rows="3"
                            value={company.comments}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <button type="submit" className="btn btn-primary">
                        {isEditing ? "Update Company" : "Add Company"}
                    </button>
                </div>
            </form>

            <h3 className="text-center mb-3">Company List</h3>
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Company Name</th>
                        <th>Location</th>
                        <th>LinkedIn Profile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((comp) => (
                        <tr key={comp.id}>
                            <td>{comp.name}</td>
                            <td>{comp.location}</td>
                            <td>
                                <a href={comp.linkedInProfile} target="_blank" rel="noreferrer">
                                    View Profile
                                </a>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEdit(comp.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(comp.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyManagement