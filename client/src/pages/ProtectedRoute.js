import React from 'react'
import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {

    const { user } = useAppContext()


    if (!user ) {
        return <Navigate to='/' />
    }
    // if (!user?.isAdmin ) {
    //     return <Navigate to='/dashboard' />
    // }
    return children

}

export default ProtectedRoute