import React from 'react';

const DefaultButton = ({
    label = "Click the Button",
    onClick,
    type = "button",
    disabled = false
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`mt-6 px-6 py-3 rounded-lg font-semibold text-white shadow-md transition duration-300
                ${disabled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2'}
            `}
        >
            {label}
        </button>
    );
};

export default DefaultButton;
