import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useForm from '../../hooks/useForm';
import DefaultInput from '../../component/Form/DefaultInput'
import DefaultButton from '../../component/Buttons/DefaultButton'
import API from '../../services/api';

const ForgetPass = () => {
    const { values, handleChange } = useForm({ email: '' });
    const { handleEmailVerificationToken } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem('emailverify')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/get-password-reset-otp', values);
            if (res.data.success === true) {
                alert(res.data.message);
                handleEmailVerificationToken(res.data.token);
                navigate('/verify-otp');
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="md:my-[8%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12 items-start">

            <div className="">
                <h1 className="text-3xl font-bold text-blue-600">Forget Password ?</h1>
                <p className="mt-8 text-gray-500">
                    Enter Email Address, verify and OTP
                </p>

                <div className="">
                    <a href="/">
                        <DefaultButton
                            type='button'
                            label='Go Back to Login'
                        />
                    </a>
                </div>
            </div>


            {/* Right Login Card */}
            <div className="bg-white border border-blue-200 rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
                {/* Header */}
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
                    Forget Password
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

                    <DefaultButton
                        type="submit"
                        label="Verify Email and Get OTP"
                    />
                </form>

                {/* Footer */}
                <p className="text-gray-500 text-xs text-center mt-6">
                    &copy; {new Date().getFullYear()} M&E System — All Rights Reserved
                </p>
            </div>
        </div>
    )
}

export default ForgetPass