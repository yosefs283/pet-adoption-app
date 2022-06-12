import React from 'react'
import Wrapper from '../styles/wrappers/BigSidebar'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import NavLinks from './NavLinks'
function BigSideBar() {
  const {showSidebar} = useAppContext()
  return (
    <Wrapper>
         <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'} >
        <div className='content' >
          <header>
            <Logo />
          </header>
            <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSideBar