import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-1 text-danger">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/" className="btn btn-primary">
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFound;
