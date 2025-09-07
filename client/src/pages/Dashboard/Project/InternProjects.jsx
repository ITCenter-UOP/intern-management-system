import React, { useEffect, useState } from 'react'
import { FaDiagramProject } from 'react-icons/fa6'
import API from '../../../services/api'

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
        </div>
    )
}

export default InternProjects