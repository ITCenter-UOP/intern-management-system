import React from 'react';

const DefaultInput = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
}) => {
    return (
        <div className="mb-5">
            {label && (
                <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 
                placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 
                focus:ring-blue-200 transition"
            />
        </div>
    );
};

export default DefaultInput;
