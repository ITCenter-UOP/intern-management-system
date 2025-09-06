import React, { useState, useEffect } from 'react';
import { FaFile } from 'react-icons/fa6';
import API from '../../../services/api';

const MyLetters = () => {
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const lettersPerPage = 10;

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchMyLetters = async () => {
            try {
                const res = await API.get(`/letter/get-my-letters`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });
                setLetters(Array.isArray(res.data.result) ? res.data.result : []);
            } catch (err) {
                console.error("Failed to fetch letters:", err);
                setError("Could not load letters");
            } finally {
                setLoading(false);
            }
        };
        fetchMyLetters();
    }, [token]);

    // Pagination logic
    const indexOfLastLetter = currentPage * lettersPerPage;
    const indexOfFirstLetter = indexOfLastLetter - lettersPerPage;
    const currentLetters = letters.slice(indexOfFirstLetter, indexOfLastLetter);

    const totalPages = Math.ceil(letters.length / lettersPerPage);

    return (
        <div className="p-6 min-h-screen">
            <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-blue-500 shadow-lg">
                    <FaFile className="fill-white w-6 h-6" />
                </div>
                <h1 className="ml-4 text-2xl font-bold text-blue-700">
                    Manage My Intern/Training Letters
                </h1>
            </div>

            {loading ? (
                <div className="text-center text-blue-600 font-semibold">Loading letters...</div>
            ) : error ? (
                <div className="text-center text-red-500 font-semibold">{error}</div>
            ) : letters.length === 0 ? (
                <div className="text-center text-blue-600 font-medium">No letters found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentLetters.map((letter) => {
                        const info = letter.letter_infor?.[0]; // Access nested info

                        return (
                            <div
                                key={letter._id}
                                className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500"
                            >
                                <div className="flex items-center mb-3">
                                    <FaFile className="text-blue-500 w-5 h-5 mr-2" />
                                    <h2 className="font-semibold text-lg text-blue-700">
                                        {letter.letter_type}
                                    </h2>
                                </div>

                                {info ? (
                                    <>
                                        <p className="text-gray-600 mb-2">
                                            <span className="font-medium">Issued At:</span>{" "}
                                            {new Date(info.issue_at).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600 mb-2">
                                            <span className="font-medium">Start Date:</span>{" "}
                                            {new Date(info.start_at).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600 mb-2">
                                            <span className="font-medium">End Date:</span>{" "}
                                            {new Date(info.end_at).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600 mb-3">
                                            <span className="font-medium">Supervisor:</span> {info.supervisor}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-gray-600 italic">No details available</p>
                                )}

                                <a
                                    href={`${import.meta.env.VITE_APP_API}/${letter.letter_store_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full block text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                                >
                                    View Letter
                                </a>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {letters.length > lettersPerPage && (
                <div className="flex justify-center mt-8 space-x-3">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-md font-medium ${page === currentPage
                                    ? "bg-blue-600 text-white"
                                    : "bg-white border border-blue-300 text-blue-700 hover:bg-blue-100"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyLetters;
