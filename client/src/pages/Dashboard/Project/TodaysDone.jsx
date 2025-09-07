import React from 'react'
import { FaDiagramProject } from 'react-icons/fa6'
import { Link, useParams } from 'react-router-dom'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const TodaysDone = () => {
    const { id } = useParams()
    return (
        <div className='p-6 min-h-screen'>
            <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-blue-600 shadow-lg">
                    <FaDiagramProject className="text-white w-6 h-6" />
                </div>
                <h1 className="ml-4 text-2xl font-bold text-blue-800">
                    Manage My Works
                </h1>
            </div>

            <div className="-mt-6 mb-2">
                <Link to={'/Dashboard/my-projects'}>
                    <DefaultButton
                        type='button'
                        label='Back'
                    />
                </Link>
            </div>
        </div>
    )
}

export default TodaysDone