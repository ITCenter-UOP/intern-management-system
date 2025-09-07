import React from 'react'
import { MdAssignmentInd } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import DefaultButton from '../../../component/Buttons/DefaultButton';

const AssignIntern = () => {
    const {id} = useParams()
    return (
        <div className='p-6 min-h-screen'>
            {/* Header */}
            <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-blue-500 shadow-lg">
                    <MdAssignmentInd className="fill-white w-6 h-6" />
                </div>
                <h1 className="ml-4 text-2xl font-bold text-blue-700">
                    Assign Interns to Projects : {id}
                </h1>
            </div>

            <div className="-mt-6 mb-2">
                <Link to={'/Dashboard/projects'}>
                    <DefaultButton 
                        type='button'
                        label='Back'
                    />
                </Link>
            </div>
        </div>
    )
}

export default AssignIntern