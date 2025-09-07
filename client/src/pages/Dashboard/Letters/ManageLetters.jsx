import React, { useState, useEffect } from 'react';
import { FaFile } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import DefaultButton from '../../../component/Buttons/DefaultButton';
import API from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const ManageLetters = () => {
    const { auth } = useAuth();
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const lettersPerPage = 25;

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchLetters = async () => {
            try {
                const res = await API.get(`/letter/all-intern-letters`, {
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
        fetchLetters();
    }, [token]);

    // Pagination logic
    const indexOfLastLetter = currentPage * lettersPerPage;
    const indexOfFirstLetter = indexOfLastLetter - lettersPerPage;
    const currentLetters = letters.slice(indexOfFirstLetter, indexOfLastLetter);
    const totalPages = Math.ceil(letters.length / lettersPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <p className="text-blue-500 font-medium">Loading letters...</p>;
    if (error) return <p className="text-red-500 font-medium">{error}</p>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-blue-500 shadow-lg">
                    <FaFile className="fill-white w-6 h-6" />
                </div>
                <h1 className="ml-4 text-2xl font-bold text-blue-700">
                    Manage Intern/Training Letters
                </h1>
            </div>

            {/* Create Button */}
            {
                (auth.role === 'admin') ?
                    <div className="">
                        <div className="mb-6">
                            <Link to={'/Dashboard/create-letter'}>
                                <DefaultButton
                                    type='button'
                                    label='Create New Intern Letter'
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                />
                            </Link>
                        </div>
                    </div>
                    :
                    <div className=""></div>
            }


            {/* Letters Table */}
            <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
                <table className="min-w-full text-sm divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                        <tr className="text-left text-blue-700">
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Username</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Letter Type</th>
                            <th className="px-4 py-3">Issue Date</th>
                            <th className="px-4 py-3">Start Date</th>
                            <th className="px-4 py-3">End Date</th>
                            <th className="px-4 py-3">Supervisor</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {currentLetters.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center py-6 text-gray-500">
                                    No letters found.
                                </td>
                            </tr>
                        ) : (
                            currentLetters.map((letter, index) => (
                                <tr
                                    key={letter._id}
                                    className="hover:bg-blue-50 transition duration-200"
                                >
                                    <td className="px-4 py-3">{indexOfFirstLetter + index + 1}</td>
                                    <td className="px-4 py-3 font-medium text-gray-700">{letter.userID?.username || '-'}</td>
                                    <td className="px-4 py-3 text-gray-600">{letter.userID?.email || '-'}</td>
                                    <td className="px-4 py-3 capitalize">{letter.letter_type.replace(/_/g, ' ')}</td>
                                    <td className="px-4 py-3">
                                        {letter.letter_infor[0]?.issue_at
                                            ? new Date(letter.letter_infor[0].issue_at).toLocaleDateString()
                                            : '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        {letter.letter_infor[0]?.start_at
                                            ? new Date(letter.letter_infor[0].start_at).toLocaleDateString()
                                            : '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        {letter.letter_infor[0]?.end_at
                                            ? new Date(letter.letter_infor[0].end_at).toLocaleDateString()
                                            : '-'}
                                    </td>
                                    <td className="px-4 py-3">{letter.letter_infor[0]?.supervisor || '-'}</td>
                                    <td className="px-4 py-3 text-center">
                                        <a
                                            href={`${import.meta.env.VITE_APP_API}/${letter.letter_store_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 font-semibold hover:underline"
                                        >
                                            View
                                        </a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-2 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-md border transition ${currentPage === page
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ManageLetters;
