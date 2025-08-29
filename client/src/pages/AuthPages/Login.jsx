import React from 'react';
import DefaultInput from '../../component/Form/DefaultInput';
import DefaultButton from '../../component/Buttons/DefaultButton';
import useForm from '../../hooks/useForm';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

const Login = () => {
    const { values, handleChange } = useForm({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', values);
            if (res.data.success === true) {
                alert(res.data.message);
                login(res.data.token);
                navigate('/Dashboard');
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="md:my-[4%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12 items-start">

            {/* Left Content */}
            <div className="space-y-4 ">
                <h1 className="text-4xl font-bold text-blue-700">
                    Welcome to Intern Monitoring and Evaluation System
                </h1>

                <div className="text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            You need an Account from administartion for access to this system
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Login Card */}
            <div className="bg-white border border-blue-200 rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
                {/* Header */}
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
                    M&E System Login
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DefaultInput
                        label="Email Address"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Enter Email Address"
                        required
                    />

                    <DefaultInput
                        label="Password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />

                    <DefaultButton
                        type="submit"
                        label="Login"
                    />
                </form>

                <a href="/forget-password" className='text-blue-500 font-semibold'>Forget Password ?</a>

                {/* Footer */}
                <p className="text-gray-500 text-xs text-center mt-6">
                    &copy; {new Date().getFullYear()} M&E System — All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Login;
