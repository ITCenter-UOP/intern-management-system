import React, { useEffect, useState } from 'react'
import { MdAssignmentInd } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import DefaultButton from '../../../component/Buttons/DefaultButton';
import API from '../../../services/api';

const AssignIntern = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [projectdata, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedInterns, setSelectedInterns] = useState([]);
    const [assigning, setAssigning] = useState(false);

    // Fetch project data
    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const res = await API.get(
                    `/project/get-one-project/${id}?nocache=${Date.now()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Cache-Control": "no-cache",
                            Pragma: "no-cache",
                            Expires: "0",
                        },
                    }
                );
                setProjectData(res.data.result || null);
            } catch (err) {
                console.error("Failed to fetch project data:", err);
                setError("Failed to load project data.");
            } finally {
                setLoading(false);
            }
        };
        fetchProjectData();
    }, [token, id]);

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await API.get(`/admin/system-users?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(Array.isArray(res.data.result) ? res.data.result : []);
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [token]);

    // List of interns
    const internUsers = users.filter(u => u.role && u.role.name === 'intern');

    // Already assigned interns (from project data)
    const assignedInterns = projectdata?.assignedInterns || [];

    // Handle checkbox change
    const handleCheckboxChange = (internId) => {
        setSelectedInterns((prev) =>
            prev.includes(internId)
                ? prev.filter(id => id !== internId)
                : [...prev, internId]
        );
    };

    // Assign interns to backend
    const handleAssignInterns = async () => {
        if (selectedInterns.length === 0) return alert("Please select at least one intern!");
        setAssigning(true);
        try {
            console.log(selectedInterns)
            // const res = await API.post(`/project/assign-interns/${id}`,
            //     { interns: selectedInterns },
            //     { headers: { Authorization: `Bearer ${token}` } }
            // );

            // if (res.data.success === true) {
            //     alert(res.data.message);
            //     setSelectedInterns([]);
            // }

        } catch (err) {
            console.error("Failed to assign interns:", err);
            alert("Failed to assign interns.");
        } finally {
            setAssigning(false);
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className='p-6 min-h-screen'>
            {/* Header */}
            <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-blue-500 shadow-lg">
                    <MdAssignmentInd className="fill-white w-6 h-6" />
                </div>
                <h1 className="ml-4 text-2xl font-bold text-blue-700">
                    Assign Interns to Projects : {projectdata?.pname}
                </h1>
            </div>

            <div className="-mt-6 mb-2">
                <Link to={'/Dashboard/projects'}>
                    <DefaultButton type='button' label='Back' />
                </Link>
            </div>

            {/* Project Details */}
            <div className="mt-4">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-blue-700 font-semibold text-xl">Project :</p>
                            <p className="pt-2 text-gray-800 font-bold">{projectdata?.pname}</p>
                        </div>
                        <div>
                            <p className="text-blue-700 font-semibold text-xl">Start Date :</p>
                            <p className="pt-2 text-gray-800">
                                {new Date(projectdata?.pstartdate).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-blue-700 font-semibold text-xl">End Date :</p>
                            <p className="pt-2 text-gray-800">
                                {new Date(projectdata?.estimatedEndDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-blue-700 font-semibold text-xl">Project Supervisor :</p>
                            <p className="pt-2 text-gray-800">{projectdata?.psupervisor?.username}</p>
                        </div>
                        <div>
                            <p className="text-blue-700 font-semibold text-xl">Project Files :</p>
                            <p className="pt-2 text-gray-800">
                                <a
                                    href={`${import.meta.env.VITE_APP_API}/${projectdata?.projectFile}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 font-semibold hover:underline"
                                >
                                    View Project Docs
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-blue-700 font-semibold text-xl">Project Description :</p>
                        <p className="pt-2 text-gray-800">{projectdata?.pdescription}</p>
                    </div>
                </div>

                {/* Assigned Interns */}
                <div className="bg-white mt-4 p-6 shadow-lg rounded-lg">
                    <h1 className="text-xl font-semibold text-blue-700 mb-3">Assigned Interns</h1>
                    {assignedInterns.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {assignedInterns.map((intern) => (
                                <li key={intern._id} className="text-gray-800 font-medium">
                                    {intern.username}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No interns assigned yet.</p>
                    )}
                </div>

                {/* Assign New Interns */}
                <div className="bg-white mt-4 p-6 shadow-lg rounded-lg">
                    <h1 className="text-xl font-semibold text-blue-700 mb-3">Assign New Interns</h1>
                    {internUsers.length > 0 ? (
                        <div className="space-y-4">
                            {internUsers.map((intern) => (
                                <div
                                    key={intern._id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    {/* Checkbox + Intern Info */}
                                    <div className="flex items-start space-x-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedInterns.includes(intern._id)}
                                            onChange={() => handleCheckboxChange(intern._id)}
                                            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
                                        />
                                        <div>
                                            <p className="text-gray-900 font-semibold text-lg">{intern.username}</p>
                                            <p className="text-gray-600 text-sm">📧 {intern.email}</p>
                                            <p className="text-gray-600 text-sm">🎓 Role: {intern.role?.name}</p>
                                        </div>
                                    </div>

                                    {/* Optional Badge */}
                                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                        Intern
                                    </span>
                                </div>
                            ))}
                        </div>

                    ) : (
                        <p className="text-gray-600">No interns available.</p>
                    )}

                    <div className="mt-4">
                        <DefaultButton
                            type="button"
                            label={assigning ? "Assigning..." : "Assign Selected Interns"}
                            onClick={handleAssignInterns}
                            disabled={assigning}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignIntern;
