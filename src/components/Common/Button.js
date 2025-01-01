import React from "react";
import PropTypes from "prop-types";

const Button = ({ label, onClick, type = "button", className = "btn btn-primary", disabled = false }) => {
    return (
        <button
            type={type}
            className={`btn ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Button;
