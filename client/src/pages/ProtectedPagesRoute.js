import React from 'react'
import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'

function ProtectedPagesRoute({ children }) {

    const { user } = useAppContext()


    if (!user?.isAdmin ) {
        return <Navigate to='/dashboard' />
    }
    return children

}

export default ProtectedPagesRoute