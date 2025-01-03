import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Notifications = () => {
    const { state } = useContext(AppContext);
    const { notifications } = state;
    const overdueCount = notifications.overdue.length;
    const dueTodayCount = notifications.dueToday.length;

    return (
        <div className="container my-4 notifications-container">
            <h4 className="mb-4 text-center text-primary">Notifications</h4>

            <div className="mb-4">
                <h5 className="text-danger">Overdue Communications</h5>
                {overdueCount > 0 ? (
                    <ul className="list-group list-group-flush">
                        {notifications.overdue.map((company) => (
                            <li
                                key={company.id}
                                className="list-group-item list-group-item-danger d-flex justify-content-between align-items-center"
                            >
                                {company.name} - Communication overdue!
                                <span className="badge bg-danger rounded-pill">{overdueCount}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-success">No overdue communications!</p>
                )}
            </div>

            <div>
                <h5 className="text-warning">Today's Communications</h5>
                {dueTodayCount > 0 ? (
                    <ul className="list-group list-group-flush">
                        {notifications.dueToday.map((company) => (
                            <li
                                key={company.id}
                                className="list-group-item list-group-item-warning d-flex justify-content-between align-items-center"
                            >
                                {company.name} - Communication due today.
                                <span className="badge bg-warning text-dark rounded-pill">{dueTodayCount}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-success">No communications due today!</p>
                )}
            </div>
        </div>
    );
};

export default Notifications;
