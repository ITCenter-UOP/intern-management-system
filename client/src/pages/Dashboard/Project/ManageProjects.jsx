import React from 'react'
import { FaDiagramProject } from 'react-icons/fa6'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import { Link } from 'react-router-dom'

const ManageProjects = () => {
    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-blue-500 shadow-lg">
                    <FaDiagramProject className="fill-white w-6 h-6" />
                </div>
                <h1 className="ml-4 text-2xl font-bold text-blue-700">
                    Manage Projects
                </h1>
            </div>

            <div className="">
                <div className="-mt-6 mb-2">
                    <Link to={'/Dashboard/create-project'}>
                        <DefaultButton
                            label='Create New Project'
                            type='button'
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ManageProjects