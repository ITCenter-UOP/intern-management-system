import React from 'react'
import { FaFile } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import DefaultButton from '../../../component/Buttons/DefaultButton'

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

            <div className="-mt-2">
                <Link to={'/Dashboard/create-letter'}>
                    <DefaultButton 
                        type='button'
                        label='Create New Intern Letter'
                    />
                </Link>
            </div>
        </div>
    )
}

export default ManageLetters