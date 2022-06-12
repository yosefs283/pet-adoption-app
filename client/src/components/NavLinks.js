import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import links from '../utils/links'

function NavLinks({toggleSidebar}) {
    const {user} = useAppContext()
    return (
        <div className='nav-links' >
            {links.map((link) => {
                const { text, path, id, icon } = link
                if (!user.isAdmin && (text==='add pet' || text==='admin page')){
                    return null
                }
                return <NavLink
                    to={path}
                    key={id}
                    onClick={toggleSidebar}
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    <span className='icon'>{icon}</span>
                    {text}
                </NavLink>

            })}
        </div>
    )
}

export default NavLinks