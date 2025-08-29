import React from 'react';

const Dropdown = ({ label, name, onChange, required = false, options = [] }) => {
    return (
        <div className="mb-5">
            {label && (
                <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <select
                id={name}
                name={name}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 
                focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
            >
                <option value="" className="text-gray-500">Select an option</option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
