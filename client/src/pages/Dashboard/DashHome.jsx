import React from 'react'
import { MdPeople, MdAssessment, MdMessage, MdShoppingCart } from 'react-icons/md'
import { FaDollarSign, FaChartLine, FaHome } from 'react-icons/fa'
import { Home } from 'lucide-react'

const DashHome = () => {
    return (
        <div className="">
            <div className="flex">
                <div className="p-2 rounded bg-blue-400">
                    <FaHome className='fill-white' />
                </div>
                <div className="">
                    <h1 className="font-bold text-xl ml-2">Dashboard</h1>
                </div>
            </div>
        </div>
    )
}

export default DashHome