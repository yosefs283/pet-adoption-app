import React, { useEffect } from 'react'
import Pet from './Pet'
import { useAppContext } from '../context/appContext'
import Wrapper from '../styles/wrappers/PetsContainer'
import Loading from './Loading'

function PetsContainer() {
  const {getPets,pets,isLoading,totalPets} = useAppContext()
  useEffect(()=>{
    getPets()
  },[])

  if(isLoading){
    return <Loading center />
  }
  if (pets.length === 0){
    return (
      <Wrapper>
        <h2>No pets to display</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>{totalPets} pets found</h5>
      <div className='pets'>
          {pets.map((pet)=>{
            return <Pet key={pet._id}{...pet} />
          })}
      </div>
    </Wrapper>
  )
}

export default PetsContainer