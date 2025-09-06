import React, { useEffect, useState } from "react";
import { FaDiagramProject } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import API from "../../../services/api";

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await API.get(`/project/get_all_projects?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                setProjects(Array.isArray(res.data.result) ? res.data.result : []);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Could not load projects");
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [token]);

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-blue-600 shadow-lg">
                    <FaDiagramProject className="text-white w-6 h-6" />
                </div>
                <h1 className="ml-4 text-2xl font-bold text-blue-800">
                    Manage Projects
                </h1>
            </div>

            {/* Actions */}
            <div className="-mt-4 mb-6">
                <Link to="/Dashboard/create-project">
                    <DefaultButton label="Create New Project" type="button" />
                </Link>
            </div>

            {/* Loading / Error */}
            {loading && (
                <p className="text-blue-600 font-medium animate-pulse">Loading...</p>
            )}
            {error && (
                <p className="text-red-500 font-semibold">⚠ {error}</p>
            )}

            {/* Project List */}
            {!loading && projects.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="bg-white shadow-md rounded-2xl p-5 border border-blue-100 hover:shadow-lg transition"
                        >
                            <h2 className="text-lg font-bold text-blue-700 mb-2">
                                {project.pname}
                            </h2>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {project.pdescription}
                            </p>
                            <div className="text-sm space-y-1">
                                <p>
                                    <span className="font-semibold text-gray-700">Supervisor:</span>{" "}
                                    {project.psupervisor?.username || "N/A"}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">Start:</span>{" "}
                                    {new Date(project.pstartdate).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">End:</span>{" "}
                                    {new Date(project.estimatedEndDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">Git Repo:</span>{" "}
                                    <a
                                        href={project.giturl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline break-words"
                                    >
                                        {project.giturl}
                                    </a>
                                </p>

                                <div className="mt-4">
                                    <a
                                        href={`${import.meta.env.VITE_APP_API}/${project.projectFile}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        View Project Docs
                                    </a>
                                    <p className="py-2">
                                        <Link to={`/Dashboard/assign-interns/${project._id}`}>
                                            <span className="text-blue-600 font-semibold hover:underline">Assign Intern To Project</span>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && (
                    <p className="text-gray-600 font-medium">No projects found.</p>
                )
            )}
        </div>
    );
};

export default ManageProjects;
