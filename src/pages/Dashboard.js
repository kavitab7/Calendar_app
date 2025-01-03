import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Modal, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";

const Dashboard = () => {
    const { state, dispatch } = useContext(AppContext);
    const [highlightedCompanies, setHighlightedCompanies] = useState({ overdue: [], dueToday: [] });
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [communicationDetails, setCommunicationDetails] = useState({ type: "", date: "", notes: "" });

    useEffect(() => {
        const calculateHighlights = () => {
            const now = new Date();
            let overdueCompanies = [];
            let dueTodayCompanies = [];

            state.companies.forEach((company) => {
                const nextCommunicationDate = new Date(company.nextCommunication.date);

                if (nextCommunicationDate < now) {
                    overdueCompanies.push(company);
                } else if (nextCommunicationDate.toDateString() === now.toDateString()) {
                    dueTodayCompanies.push(company);
                }
            });

            setHighlightedCompanies({ overdue: overdueCompanies, dueToday: dueTodayCompanies });
        };

        calculateHighlights();
    }, [state.companies]);

    const handleLogCommunication = () => {
        selectedCompanies.forEach((company) => {
            const updatedCompany = { ...company };
            updatedCompany.highlight = "";
            updatedCompany.lastCommunications.push({
                type: communicationDetails.type,
                date: communicationDetails.date,
                notes: communicationDetails.notes
            });
            updatedCompany.nextCommunication = {
                type: communicationDetails.type,
                date: new Date(new Date(communicationDetails.date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                notes: "Follow-up on last communication"
            };
            dispatch({ type: "UPDATE_COMPANY", payload: updatedCompany });
        });

        setSelectedCompanies([]);
        setShowModal(false);
    };

    const handleCompanySelect = (company) => {
        setSelectedCompanies((prev) => prev.includes(company) ? prev.filter((item) => item !== company) : [...prev, company]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommunicationDetails((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {state.companies.map((company) => (
                    <div className="col-md-4 mb-4" key={company.id}>
                        <div className="card shadow-sm d-flex flex-column" style={{
                            borderColor: company.highlight === "yellow" ? "#FFEB3B" : company.highlight === "red" ? "#FF5722" : "white",
                            height: "100%"
                        }}>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-center">{company.name}</h5>
                                <p className="card-text">
                                    <strong>Industry:</strong> {company.industry} <br />
                                    <strong>Location:</strong> {company.location} <br />
                                    <strong>Contact:</strong> {company.contact} <br />
                                    <strong>Next Communication:</strong> {company.nextCommunication.type} on {company.nextCommunication.date}
                                </p>

                                <h6>Last Communications:</h6>
                                <ul>
                                    {company.lastCommunications.slice(0, 5).map((comm, idx) => (
                                        <OverlayTrigger key={idx} placement="top" overlay={<Tooltip id={`tooltip-${idx}`}>{comm.notes}</Tooltip>}>
                                            <li><strong>{comm.type}</strong> on {comm.date}</li>
                                        </OverlayTrigger>
                                    ))}
                                </ul>

                                <button
                                    className={`btn ${selectedCompanies.includes(company) ? "btn-warning" : "btn-primary"} w-100 mt-auto`}
                                    onClick={() => handleCompanySelect(company)}
                                >
                                    {selectedCompanies.includes(company) ? "Deselect" : "Select"} Company
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-center">
                <Button variant="success" onClick={() => setShowModal(true)} disabled={selectedCompanies.length === 0}>
                    Communication Performed
                </Button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Communication Performed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="communicationType">
                            <Form.Label>Type of Communication</Form.Label>
                            <Form.Control
                                as="select"
                                name="type"
                                value={communicationDetails.type}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Type</option>
                                <option value="LinkedIn Post">LinkedIn Post</option>
                                <option value="Email">Email</option>
                                <option value="Phone Call">Phone Call</option>
                                <option value="Meeting">Meeting</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="communicationDate">
                            <Form.Label>Date of Communication</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={communicationDetails.date}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="communicationNotes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="notes"
                                value={communicationDetails.notes}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleLogCommunication}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
