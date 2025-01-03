import React from 'react';
import CalendarView from '../components/Common/CalendarView';
import Notifications from '../components/Common/Notifications';
import Dashboard from './Dashboard';

const UserPage = () => {
    return (
        <div className="container mt-5">
            <Dashboard />
            <div className="my-4">
                <Notifications />
            </div>
            <div className="my-4">
                <CalendarView />
            </div>
        </div>
    );
};

export default UserPage;
