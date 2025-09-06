import React from 'react'
import { FaFile } from 'react-icons/fa6'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import { Link } from 'react-router-dom'

const CreateNewLetter = () => {
    return (
        <div>
            <div className="flex">
                <div className="p-2 rounded bg-blue-400">
                    <FaFile className="fill-white" />
                </div>
                <div>
                    <h1 className="font-bold text-xl ml-2">Create New Intern Letter</h1>
                </div>
            </div>

            <div className="-mt-2">
                <Link to={'/Dashboard/letters'}>
                    <DefaultButton
                        type='button'
                        label='Back'
                    />
                </Link>
            </div>
        </div>
    )
}

export default CreateNewLetter