import React, { useEffect, useState } from "react";
import { FaGraduationCap, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import API from "../../../services/api";
import DefaultButton from '../../../component/Buttons/DefaultButton'

const ViewIntern = () => {
    const { email } = useParams();
    const token = localStorage.getItem("token");

    const [internData, setInternData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInternData = async () => {
            try {
                const res = await API.get(
                    `/intern/intern-data/${email}?nocache=${Date.now()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Cache-Control": "no-cache",
                            Pragma: "no-cache",
                            Expires: "0",
                        },
                    }
                );
                setInternData(res.data.result || null);
            } catch (err) {
                console.error("Failed to fetch Intern Data:", err);
                setError("Failed to load intern data.");
            } finally {
                setLoading(false);
            }
        };

        if (token && email) {
            fetchInternData();
        } else {
            setError("Invalid request.");
            setLoading(false);
        }
    }, [token, email]);

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center mb-6">
                <div className="p-3 rounded-2xl bg-blue-500/70 backdrop-blur-md shadow-md">
                    <FaGraduationCap className="text-white text-xl" />
                </div>
                <h1 className="font-bold text-2xl ml-3 text-gray-800">
                    Intern Information
                </h1>
            </div>

            <div className="">
                <Link to={'/Dashboard/system-users'}>
                    <div className="-mt-6 mb-2">
                        <DefaultButton
                            label="Back"
                            type="button"
                        />
                    </div>
                </Link>
            </div>

            {/* States */}
            {loading && (
                <p className="text-gray-500 animate-pulse">Loading intern data...</p>
            )}
            {error && <p className="text-red-600">{error}</p>}

            {/* Intern Info */}
            {!loading && !error && internData && (
                <div className="rounded-2xl p-6 bg-white/60 backdrop-blur-md shadow-lg border border-blue-100 max-w-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Side */}
                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-semibold text-gray-800">
                                {internData.userID?.username ?? "N/A"}
                            </p>

                            <p className="text-sm text-gray-500 mt-4">Email</p>
                            <p className="font-semibold text-gray-800">
                                {internData.userID?.email ?? "N/A"}
                            </p>

                            <p className="text-sm text-gray-500 mt-4">Course</p>
                            <p className="font-semibold text-gray-800">
                                {internData.course || "-"}
                            </p>

                            <p className="text-sm text-gray-500 mt-4">University / Campus</p>
                            <p className="font-semibold text-gray-800">
                                {internData.camups || "-"}
                            </p>
                        </div>

                        {/* Right Side */}
                        <div>
                            <p className="text-sm text-gray-500">Date of Birth</p>
                            <p className="font-semibold text-gray-800">
                                {internData.dob
                                    ? new Date(internData.dob).toLocaleDateString()
                                    : "-"}
                            </p>

                            <p className="text-sm text-gray-500 mt-4">Address</p>
                            <p className="font-semibold text-gray-800">
                                {internData.address || "-"}
                            </p>

                            <p className="text-sm text-gray-500 mt-4">Joined On</p>
                            <p className="font-semibold text-gray-800">
                                {internData.joinAt
                                    ? new Date(internData.joinAt).toLocaleDateString()
                                    : "-"}
                            </p>

                            <p className="text-sm text-gray-500 mt-4">Internship End</p>
                            <p className="font-semibold text-gray-800">
                                {internData.InternshipEndAt
                                    ? new Date(internData.InternshipEndAt).toLocaleDateString()
                                    : "Ongoing"}
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 mt-6">
                        {internData.github && (
                            <a
                                href={internData.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-blue-600 hover:underline"
                            >
                                <FaGithub /> GitHub
                            </a>
                        )}
                        {internData.linkedin && (
                            <a
                                href={internData.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-blue-700 hover:underline"
                            >
                                <FaLinkedin /> LinkedIn
                            </a>
                        )}
                        {internData.cv && (
                            <a
                                href={`${import.meta.env.VITE_APP_API}/uploads/${internData.cv}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-purple-600 hover:underline"
                            >
                                📄 CV
                            </a>
                        )}
                    </div>

                    {/* Status */}
                    <div className="mt-6 flex gap-4">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${internData.isApprove
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-600"
                                }`}
                        >
                            {internData.isApprove ? "Approved" : "Pending"}
                        </span>      
                    </div>
                </div>
            )}

            {!loading && !error && !internData && (
                <p className="text-gray-500">No intern data found.</p>
            )}
        </div>
    );
};

export default ViewIntern;
