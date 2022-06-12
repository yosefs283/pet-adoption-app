import React from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../styles/wrappers/DashboardFormPage'
import FormSelect from './FormSelect'

function SearchContainer() {
  const { petTypeOptions, petType, handleChange, getPetsBySearch,getPets } = useAppContext()
  const handlePetInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }
  return (
    <Wrapper>
      <form className='form'  >
        <h3>Search</h3>
        <div className='form-center'>
          <FormSelect name='petType' value={petType} petList={petTypeOptions} handleChange={handlePetInput} labelText='Pet type' />
        </div>
      </form>
      <div className='btn-container'>
        <button className='btn btn-block search-btn' onClick={() => getPetsBySearch(petType)}>Search</button>
        <button className='btn btn-block clear-btn' onClick={getPets}>Reset</button>
      </div>
    </Wrapper>
  )
}

export default SearchContainer