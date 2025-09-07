import React, { useEffect, useState } from 'react'
import { FaDiagramProject } from 'react-icons/fa6'
import API from '../../../services/api';
import { Link } from 'react-router-dom';

const InternProjects = () => {
    const [myprojects, setmyprojects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchmyprojects = async () => {
            try {
                const res = await API.get(`/project/intern-projects?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                setmyprojects(Array.isArray(res.data.result) ? res.data.result : []);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Could not load projects");
                setmyprojects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchmyprojects();
    }, [token]);

    return (
        <div className='p-6 min-h-screen'>
            <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-blue-600 shadow-lg">
                    <FaDiagramProject className="text-white w-6 h-6" />
                </div>
                <h1 className="ml-4 text-2xl font-bold text-blue-800">
                    Manage My Projects
                </h1>
            </div>

            {loading && <p className="text-gray-600">Loading projects...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && myprojects.length === 0 && (
                <p className="text-gray-600">You are not assigned to any projects yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myprojects.map((project) => (
                    <div
                        key={project._id}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                    >
                        <h2 className="text-xl font-bold text-blue-700 mb-2">
                            {project.pname}
                        </h2>
                        <p className="text-gray-700 mb-3">{project.pdescription}</p>

                        <p className="text-sm text-gray-600 mb-1">
                            <span className="font-semibold">Supervisor:</span>{" "}
                            {project.psupervisor?.username} ({project.psupervisor?.email})
                        </p>

                        <p className="text-sm text-gray-600 mb-1">
                            <span className="font-semibold">Start Date:</span>{" "}
                            {new Date(project.pstartdate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                            <span className="font-semibold">Estimated End Date:</span>{" "}
                            {new Date(project.estimatedEndDate).toLocaleDateString()}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <a
                                href={project.giturl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Git Repository
                            </a>
                            {project.projectFile && (
                                <a
                                    href={`${import.meta.env.VITE_APP_API}/${project.projectFile}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 text-sm font-medium rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
                                >
                                    View Project File
                                </a>
                            )}
                            <div className="">
                                <Link>
                                    <div className="px-4 py-2 text-sm font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
                                        Add Today's Doing
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InternProjects
