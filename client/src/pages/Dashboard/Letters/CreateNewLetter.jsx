import React, { useState, useEffect } from 'react';
import { FaFile } from 'react-icons/fa6';
import DefaultButton from '../../../component/Buttons/DefaultButton';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import Dropdown from '../../../component/Form/Dropdown';
import DateInput from '../../../component/Form/DateInput';
import API from '../../../services/api';
import DefaultInput from '../../../component/Form/DefaultInput';

const CreateNewLetter = () => {
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const { values, handleChange } = useForm({
        intern: '',
        internname: '',
        startat: '',
        enddate: '',
        supervisor: '',
        letter_type: ''
    });

    const navigate = useNavigate();

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

    // Prepare dropdown options
    const internOptions = users
        .filter(u => u.role && u.role.name === 'intern')
        .map(u => ({ value: u._id, label: u.username }));

    const supervisorOptions = users
        .filter(u => u.role && u.role.name === 'supervisor')
        .map(u => ({ value: u._id, label: u.username }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values);
        try {
            const res = await API.post(`/letter/create-letter?nocache=${Date.now()}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                },
            });
            if (res.data.success) {
                alert(res.data.message);
                navigate('/Dashboard/letters');
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-6">
            <div className="flex items-center mb-4">
                <div className="p-2 rounded bg-blue-400">
                    <FaFile className="fill-white" />
                </div>
                <h1 className="font-bold text-xl ml-2">Create New Intern Letter</h1>
            </div>

            <div className="-mt-2 mb-4">
                <Link to={'/Dashboard/letters'}>
                    <DefaultButton type="button" label="Back" />
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <DefaultInput
                    label={"Enter Intern Name"}
                    value={values.internname}
                    name="internname"
                    onChange={handleChange}
                    required
                    placeholder={"Enter Intern Name"}

                />
                <Dropdown
                    label="Select Intern"
                    name="intern"
                    onChange={handleChange}
                    options={internOptions}
                    required
                />

                <Dropdown
                    label="Select Supervisor"
                    name="supervisor"
                    onChange={handleChange}
                    options={supervisorOptions}
                    required
                />

                <DateInput
                    label="Start Date"
                    name="startat"
                    value={values.startat}
                    onChange={handleChange}
                    required
                />

                <DateInput
                    label="End Date"
                    name="enddate"
                    value={values.enddate}
                    onChange={handleChange}
                    required
                />

                <Dropdown
                    label="Letter Type"
                    name="letter_type"
                    onChange={handleChange}
                    options={[
                        { value: 'internship_start_letter', label: 'Internship Start Letter' },
                    ]}
                    required
                />

                <DefaultButton
                    type="submit"
                    label="Create Letter"
                />
            </form>
        </div>
    );
};

export default CreateNewLetter;
