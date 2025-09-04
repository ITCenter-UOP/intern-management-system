import React from 'react'
import { useParams } from 'react-router-dom'

const ViewIntern = () => {
    const { email } = useParams()
    return (
        <div>{email}</div>
    )
}

export default ViewIntern