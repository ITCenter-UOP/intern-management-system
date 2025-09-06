import React from 'react'
import { FaFile } from 'react-icons/fa6'

const ManageLetters = () => {
    return (
        <div>
            <div className="flex">
                <div className="p-2 rounded bg-blue-400">
                    <FaFile className="fill-white" />
                </div>
                <div>
                    <h1 className="font-bold text-xl ml-2">Manage Intern/Training Letters</h1>
                </div>
            </div>
        </div>
    )
}

export default ManageLetters