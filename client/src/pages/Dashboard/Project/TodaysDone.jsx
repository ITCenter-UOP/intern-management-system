import React, { useState, useEffect } from 'react'
import { FaDiagramProject } from 'react-icons/fa6'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'

const TodaysDone = () => {
    const { id } = useParams()
    const token = localStorage.getItem('token')
    const { values, handleChange, resetForm } = useForm({
        work: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [todayWork, setTodayWork] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMyWork = async () => {
            try {
                const res = await API.get(
                    `/project/my-works-done?nocache=${Date.now()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Cache-Control": "no-cache",
                            Pragma: "no-cache",
                            Expires: "0",
                        },
                    }
                )

                const result = res.data.result

                if (result) {
                    // Only consider works for today
                    const todayStr = new Date().toISOString().split("T")[0]
                    const workDateStr = new Date(result.createdAt).toISOString().split("T")[0]

                    // Check project ID and date
                    if ((result.projectID?._id === id || result.projectID === id) && workDateStr === todayStr) {
                        setTodayWork(result)
                        values.work = result.works // prefill form
                    } else {
                        setTodayWork(null)
                        values.work = ''
                    }
                }
            } catch (err) {
                console.error("Failed to fetch work:", err)
                setError("Could not load today's work")
            }
        }

        fetchMyWork()
    }, [token, id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
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
                resetForm()
                navigate('/Dashboard/my-projects')
            } else {
                setError(res.data.message || 'Something went wrong')
            }
        } catch (err) {
            console.log(err)
            setError('Failed to save today’s work. Please try again.')
        } finally {
            setLoading(false)
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

            {todayWork && (
                <div className="mt-4 bg-green-50 rounded-lg shadow p-4 border border-green-200">
                    <h2 className="font-semibold text-green-800 mb-2">Your Work Today:</h2>
                    <p className="text-gray-700 mb-1">
                        <span className="font-medium">Project:</span> {todayWork.projectID?.pname}
                    </p>
                    <p className="text-gray-700">{todayWork.works}</p>
                </div>
            )}

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

                    {error && (
                        <p className="text-red-600 font-medium mb-3">
                            {error}
                        </p>
                    )}

                    <DefaultButton
                        type="submit"
                        label={loading ? 'Saving...' : todayWork ? 'Update Work' : 'Save Work'}
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    )
}

export default TodaysDone
