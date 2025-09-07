import React, { useEffect, useState } from 'react'
import { MdAssignmentInd } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import DefaultButton from '../../../component/Buttons/DefaultButton';
import API from '../../../services/api';

const AssignIntern = () => {
    const { id } = useParams()
    const token = localStorage.getItem("token");

    const [projectdata, setprojectdata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchprojectData = async () => {
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
                setprojectdata(res.data.result || null);
            } catch (err) {
                console.error("Failed to fetch Intern Data:", err);
                setError("Failed to load intern data.");
            } finally {
                setLoading(false);
            }
        };
        fetchprojectData()
    }, [token, id]);
    return (
        <div className='p-6 min-h-screen'>
            {/* Header */}
            <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-blue-500 shadow-lg">
                    <MdAssignmentInd className="fill-white w-6 h-6" />
                </div>
                <h1 className="ml-4 text-2xl font-bold text-blue-700">
                    Assign Interns to Projects : {id}
                </h1>
            </div>

            <div className="-mt-6 mb-2">
                <Link to={'/Dashboard/projects'}>
                    <DefaultButton
                        type='button'
                        label='Back'
                    />
                </Link>
            </div>
        </div>
    )
}

export default AssignIntern