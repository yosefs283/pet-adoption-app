import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import Wrapper from '../styles/wrappers/Pet'
import UserInfo from './UserInfo'



function User({ firstName, lastName,email,isAdmin }) {
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{firstName.charAt(0)}</div>
                <div className='info'>
                    <h5>Name: {`${firstName} ${lastName}`}</h5>
                    <p>Admin: {`${isAdmin}`}</p>
                </div>
            </header>
            <div className='content'>
                <div>
                    <UserInfo icon={<BiUserCircle />} text={email} />

                </div>
            </div>
        </Wrapper>
    )
}

export default User