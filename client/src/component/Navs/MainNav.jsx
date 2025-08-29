import React from 'react';
import { FaUser } from 'react-icons/fa';
import uoplogo from '../../assets/uoplogo.png'

const MainNav = () => {
    return (
        <header className="bg-white shadow-md border-b border-blue-100">
            <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                {/* Left Side */}
                <div className="flex items-center space-x-4">
                    <img src={uoplogo} className='h-16 w-auto'/>
                </div>

                {/* Right Side */}
                <div className="md:text-lg font-semibold text-blue-600 tracking-wide">
                    <p className="xl:block hidden">Intern Monitoring and Evaluation System</p>
                    <p className="xl:hidden">M&E System</p>
                </div>
            </div>
        </header>
    );
};

export default MainNav;
