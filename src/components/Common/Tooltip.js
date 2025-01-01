import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Tooltip = ({ id, text, children, placement = "top" }) => {
    useEffect(() => {
        const tooltipTriggerList = [].slice.call(
            document.querySelectorAll(`[data-bs-toggle="tooltip"]`)
        );
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, []);

    return (
        <span
            id={id}
            data-bs-toggle="tooltip"
            data-bs-placement={placement}
            title={text}
            className="d-inline-block"
        >
            {children}
        </span>
    );
};

Tooltip.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

export default Tooltip;
