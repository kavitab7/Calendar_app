import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const defaultMethods = [
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { name: "LinkedIn Message", description: "Direct message on LinkedIn", sequence: 2, mandatory: true },
    { name: "Email", description: "Email communication", sequence: 3, mandatory: true },
    { name: "Phone Call", description: "Call the company on phone", sequence: 4, mandatory: false },
    { name: "Other", description: "Other forms of communication", sequence: 5, mandatory: false },
];

const CommunicationMethodManagement = () => {
    const { state, dispatch } = useContext(AppContext);
    const [newMethod, setNewMethod] = useState({ name: "", description: "", sequence: 0, mandatory: false });
    const [errorMessage, setErrorMessage] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [editingMethodId, setEditingMethodId] = useState(null);

    useEffect(() => {
        if (state.communicationMethods.length === 0) {
            dispatch({ type: "SET_COMMUNICATION_METHODS", payload: defaultMethods });
        }
    }, [dispatch, state.communicationMethods.length]);

    const handleAddMethod = () => {
        const { name, description, sequence } = newMethod;

        if (!name.trim() || !description.trim()) {
            setErrorMessage("Both method name and description are required!");
            return;
        }

        const existingSequence = state.communicationMethods.some(method => method.sequence === sequence);
        if (existingSequence) {
            setErrorMessage("Sequence already exists!");
            return;
        }

        if (isEdit) {
            dispatch({
                type: "UPDATE_COMMUNICATION_METHOD",
                payload: { id: editingMethodId, name, description, sequence, mandatory: newMethod.mandatory },
            });
            setIsEdit(false);
            setEditingMethodId(null);
        } else {
            dispatch({
                type: "ADD_COMMUNICATION_METHOD",
                payload: { id: Date.now(), name, description, sequence, mandatory: newMethod.mandatory },
            });
        }

        setNewMethod({ name: "", description: "", sequence: 0, mandatory: false });
        setErrorMessage("");
    };

    const handleEditMethod = (method) => {
        setNewMethod({ name: method.name, description: method.description, sequence: method.sequence, mandatory: method.mandatory });
        setIsEdit(true);
        setEditingMethodId(method.id);
    };

    const handleDeleteMethod = (id) => {
        dispatch({ type: "DELETE_COMMUNICATION_METHOD", payload: id });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMethod((prevMethod) => ({ ...prevMethod, [name]: value }));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-5 fw-bold">Communication Method Management</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="card shadow-lg p-4 rounded">
                        <h5 className="card-title text-primary text-center">{isEdit ? "Edit Communication Method" : "Add New Communication Method"}</h5>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Communication Method Name"
                                name="name"
                                value={newMethod.name}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Description"
                                name="description"
                                value={newMethod.description}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                className="form-control mb-2"
                                placeholder="Sequence"
                                name="sequence"
                                value={newMethod.sequence}
                                onChange={handleChange}
                            />
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="mandatory"
                                    checked={newMethod.mandatory}
                                    onChange={() => setNewMethod((prev) => ({ ...prev, mandatory: !prev.mandatory }))}
                                />
                                <label className="form-check-label">Mandatory</label>
                            </div>
                            <button className="btn btn-primary w-100" onClick={handleAddMethod}>
                                {isEdit ? "Update Method" : "Add Method"}
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
                                <th>Method</th>
                                <th>Description</th>
                                <th>Sequence</th>
                                <th>Mandatory</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(state.communicationMethods) && state.communicationMethods.map((method, index) => (
                                <tr key={method.id}>
                                    <td>{index + 1}</td>
                                    <td>{method.name}</td>
                                    <td>{method.description}</td>
                                    <td>{method.sequence}</td>
                                    <td>{method.mandatory ? "Yes" : "No"}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEditMethod(method)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMethod(method.id)}>
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

export default CommunicationMethodManagement;
