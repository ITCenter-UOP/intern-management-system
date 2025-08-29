import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import DefaultButton from '../../component/Buttons/DefaultButton';
import DefaultInput from '../../component/Form/DefaultInput';
import API from '../../services/api';

const VerfiyOTP = () => {
    const token = localStorage.getItem('emailverify');
    const { values, handleChange } = useForm({ otp: '' });
    const navigate = useNavigate();

    // ✅ Correct hook usage
    useEffect(() => {
        if (!token) {
            localStorage.clear();
            navigate('/', { replace: true });
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/check-password-reset-otp', values, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success === true) {
                alert(res.data.message);
                navigate('/update-password');
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="md:my-[8%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12 items-start">

            <div>
                <h1 className="text-3xl font-bold text-blue-600">Verify OTP now</h1>
                <p className="mt-8 text-gray-500">
                    Enter OTP here, OTP is already sent to your provided email address
                </p>

                <div>
                    <a href="/">
                        <DefaultButton
                            type='button'
                            label='Go Back to Login'
                        />
                    </a>
                </div>
            </div>

            <div className="bg-white border border-blue-200 rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
                    OTP Verification
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <DefaultInput
                        label="OTP Number"
                        name="otp"
                        value={values.otp}
                        onChange={handleChange}
                        placeholder="Enter OTP Number"
                        required
                    />

                    <DefaultButton
                        type="submit"
                        label="Verify OTP"
                    />
                </form>

                <p className="text-gray-500 text-xs text-center mt-6">
                    &copy; {new Date().getFullYear()} M&E System — All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default VerfiyOTP;
