import React from 'react';

const TextAreaInput = ({
    label,
    name,
    rows = 4,
    value,
    onChange,
    placeholder = '',
    required = false,
}) => {
    return (
        <div className="mb-5">
            {label && (
                <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 
                placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 
                focus:ring-blue-200 transition resize-none"
            />
        </div>
    );
};

export default TextAreaInput;
