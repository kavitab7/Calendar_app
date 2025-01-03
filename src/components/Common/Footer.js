import React from "react";

const Footer = () => {
    return (
        <footer className="bg-light mt-5">
            <div className="container text-center">
                <p className="mb-0">
                    &copy; {new Date().getFullYear()} Communication Manager. All rights reserved.
                </p>
                <p>
                    <a href="/privacy" className="text-dark text-decoration-none mx-3">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="text-dark text-decoration-none mx-3">
                        Terms of Service
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
