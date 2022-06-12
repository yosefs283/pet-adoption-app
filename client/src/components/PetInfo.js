import React from 'react'
import Wrapper from '../styles/wrappers/PetInfo'


function PetInfo({icon,text}) {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  )
}

export default PetInfo