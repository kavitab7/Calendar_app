import React, { useState, useContext, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Form, Modal, Button } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";

const CalendarView = () => {
    const { state, dispatch } = useContext(AppContext);
    const { interactions, companies, communicationMethods } = state;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [communicationDetails, setCommunicationDetails] = useState({
        companyId: "",
        methodId: "",
        date: "",
        details: "",
    });

    const communicationsForDate = useMemo(() => {
        return interactions
            .filter(
                (interaction) =>
                    new Date(interaction.date).toDateString() ===
                    selectedDate.toDateString()
            )
            .map((interaction) => {
                const company = companies.find(
                    (company) => company.id === interaction.companyId
                );
                const method = communicationMethods.find(
                    (method) => method.id === interaction.methodId
                );
                return {
                    ...interaction,
                    companyName: company?.name,
                    communicationMethod: method?.name,
                };
            });
    }, [interactions, companies, communicationMethods, selectedDate]);

    const upcomingCommunications = useMemo(() => {
        return interactions
            .filter((interaction) => new Date(interaction.date) > new Date())
            .map((interaction) => {
                const company = companies.find(
                    (company) => company.id === interaction.companyId
                );
                const method = communicationMethods.find(
                    (method) => method.id === interaction.methodId
                );
                return {
                    ...interaction,
                    companyName: company?.name,
                    communicationMethod: method?.name,
                };
            });
    }, [interactions, companies, communicationMethods]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommunicationDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddCommunication = () => {
        dispatch({
            type: "ADD_INTERACTION",
            payload: communicationDetails,
        });
        setShowModal(false);
    };

    return (
        <div className="container py-4 calendar-view-container">
            <h2 className="text-center mb-4 text-primary">Calendar View</h2>
            <div className="d-flex justify-content-center mb-4">
                <Calendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    className="react-calendar rounded shadow-sm"
                />
            </div>

            <div className="communications-list mb-5">
                <h3 className="mb-3 text-info">Past Communications on {selectedDate.toDateString()}</h3>
                {communicationsForDate.length > 0 ? (
                    <ul className="list-unstyled">
                        {communicationsForDate.map((comm, index) => (
                            <li key={index} className="mb-3 p-3 border rounded shadow-sm">
                                <strong>{comm.companyName}</strong>: {comm.communicationMethod} on {comm.date} <br />
                                <em>{comm.details}</em>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No past communications logged for this date.</p>
                )}
            </div>

            <div className="communications-list mb-5">
                <h3 className="mb-3 text-info">Upcoming Communications</h3>
                {upcomingCommunications.length > 0 ? (
                    <ul className="list-unstyled">
                        {upcomingCommunications.map((comm, index) => (
                            <li key={index} className="mb-3 p-3 border rounded shadow-sm">
                                <strong>{comm.companyName}</strong>: {comm.communicationMethod} on {comm.date} <br />
                                <em>{comm.details}</em>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No upcoming communications scheduled.</p>
                )}
            </div>

            <div className="text-center">
                <Button variant="success" size="lg" onClick={() => setShowModal(true)}>
                    Add Communication
                </Button>
            </div>

            {showModal && (
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Communication</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="companyId" className="mb-3">
                                <Form.Label>Company</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="companyId"
                                    value={communicationDetails.companyId}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Company</option>
                                    {companies.map((company) => (
                                        <option key={company.id} value={company.id}>
                                            {company.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="methodId" className="mb-3">
                                <Form.Label>Communication Method</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="methodId"
                                    value={communicationDetails.methodId}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Method</option>
                                    {communicationMethods.map((method) => (
                                        <option key={method.id} value={method.id}>
                                            {method.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="date" className="mb-3">
                                <Form.Label>Date of Communication</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={communicationDetails.date}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="details" className="mb-3">
                                <Form.Label>Details</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="details"
                                    value={communicationDetails.details}
                                    onChange={handleInputChange}
                                    rows={3}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAddCommunication}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default CalendarView;
