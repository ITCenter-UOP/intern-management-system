import React from 'react'
import { FaDiagramProject } from 'react-icons/fa6'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'

const TodaysDone = () => {
    const { id } = useParams()
    const token = localStorage.getItem('token')
    const { values, handleChange } = useForm({
        work: '', 
    })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post(
                `/project/add-today-works/${id}?nocache=${Date.now()}`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Cache-Control': 'no-cache',
                        Pragma: 'no-cache',
                        Expires: '0',
                    },
                }
            )
            if (res.data.success === true) {
                alert(res.data.message)
                navigate('/Dashboard/my-projects')
            } else {
                alert(res.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="p-6 min-h-screen">
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
                    <DefaultButton type="button" label="Back" />
                </Link>
            </div>

            <div className="mt-4 bg-white rounded-lg shadow-lg p-6">
                <form onSubmit={handleSubmit} method="post">
                    <TextAreaInput
                        label="Today's Work"
                        name="work"
                        rows={6}
                        value={values.work}
                        onChange={handleChange}
                        placeholder="Describe what you did today..."
                        required
                    />

                    <DefaultButton
                        type="submit"
                        label="Save Work"
                    />
                </form>
            </div>
        </div>
    )
}

export default TodaysDone
