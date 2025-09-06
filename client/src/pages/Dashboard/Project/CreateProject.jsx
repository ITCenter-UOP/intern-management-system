import React, { useState, useEffect } from 'react'
import { FaDiagramProject } from 'react-icons/fa6'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'

import DefaultInput from '../../../component/Form/DefaultInput'
import DateInput from '../../../component/Form/DateInput'
import Dropdown from '../../../component/Form/Dropdown'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import FileInput from '../../../component/Form/FileInput'

const CreateProject = () => {
    const { values, handleChange, setValues } = useForm({
        pname: '',
        pdescription: '',
        giturl: '',
        psupervisor: '',
        pstartdate: '',
        estimatedEndDate: '',
        projectFile: null,
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleFileChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.files[0] });
    };

    // Fetch system users and filter supervisors
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

    const supervisorOptions = users
        .filter(u => u.role && u.role.name === 'supervisor')
        .map(u => ({ value: u._id, label: u.username }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });

            const res = await API.post(`/project/create?nocache=${Date.now()}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                alert(res.data.message);
                navigate('/Dashboard/projects');
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong while creating project");
        }
    };

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            {/* Header */}
            <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-blue-500 shadow-lg">
                    <FaDiagramProject className="fill-white w-6 h-6" />
                </div>
                <h1 className="ml-4 text-2xl font-bold text-blue-700">
                    Create New Project
                </h1>
            </div>

            {/* Back Button */}
            <div className="-mt-6 mb-4">
                <Link to={'/Dashboard/projects'}>
                    <DefaultButton
                        label='Back'
                        type='button'
                    />
                </Link>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6">
                <DefaultInput
                    label="Project Name"
                    name="pname"
                    value={values.pname}
                    onChange={handleChange}
                    required
                    placeholder="Enter project name"
                />

                <TextAreaInput
                    label="Project Description"
                    name="pdescription"
                    value={values.pdescription}
                    onChange={handleChange}
                    required
                    placeholder="Describe the project..."
                />

                <DefaultInput
                    label="Git Repository URL"
                    name="giturl"
                    value={values.giturl}
                    onChange={handleChange}
                    placeholder="https://github.com/username/repo"
                />

                {/* Supervisor Dropdown */}
                <Dropdown
                    label="Supervisor"
                    name="psupervisor"
                    onChange={handleChange}
                    required
                    options={loading ? [] : supervisorOptions}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DateInput
                        label="Start Date"
                        name="pstartdate"
                        value={values.pstartdate}
                        onChange={handleChange}
                        required
                    />
                    <DateInput
                        label="Estimated End Date"
                        name="estimatedEndDate"
                        value={values.estimatedEndDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <FileInput
                    label="Upload Project Document (Optional)"
                    name="projectFile"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.zip"
                />

                <div className="mt-6 flex justify-end">
                    <DefaultButton
                        label="Create Project"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateProject
