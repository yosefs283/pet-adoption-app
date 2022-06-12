import React, { useEffect } from 'react'
import User from './User'
import { useAppContext } from '../context/appContext'
import Wrapper from '../styles/wrappers/PetsContainer'
import Loading from './Loading'



function UsersContainer() {
    const { getAllUsers, users ,isLoading} = useAppContext()
    useEffect(() => {
        getAllUsers()
    }, [])
    if (isLoading) {
        return <Loading center />
    }
    return (
        <Wrapper>
            <h5>{users.length} users found</h5>
            <div className='pets'>
                {users.map((user) => {
                    return <User key={user._id}{...user} />
                })}
            </div>
        </Wrapper>
    )
}

export default UsersContainer