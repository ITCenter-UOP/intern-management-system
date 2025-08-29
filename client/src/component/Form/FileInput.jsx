import React from 'react';

const FileInput = ({ label, name, onChange, required = false, accept, multiple = false }) => {
    return (
        <div className="mb-5">
            {label && (
                <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <input
                type="file"
                name={name}
                id={name}
                onChange={onChange}
                required={required}
                accept={accept}
                multiple={multiple}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-white 
                file:px-4 file:py-2 file:mr-4 file:border-0 file:bg-blue-600 file:text-white 
                file:rounded-md hover:file:bg-blue-500 focus:outline-none focus:border-blue-600 
                focus:ring-2 focus:ring-blue-200 transition"
            />
        </div>
    );
};

export default FileInput;
