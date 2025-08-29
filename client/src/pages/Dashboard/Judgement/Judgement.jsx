import React from 'react'
import { FaBalanceScale } from "react-icons/fa"

const Judgement = () => {
    return (
        <div>
            <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 rounded-full bg-blue-500 shadow-lg">
                    <FaBalanceScale className="text-white text-2xl" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Judgements
                </h1>
            </div>
        </div>
    )
}

export default Judgement