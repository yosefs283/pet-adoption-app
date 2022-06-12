import React from 'react'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../styles/wrappers/DashboardFormPage'
import { FormRow, Alert, FormSelect } from '../../components'
import ImageUpload from '../../components/ImageUpload'


function AddPet() {
  const { showAlert,
    createPet,
    isEditing,
    isLoading,
    displayAlert,
    petName,
    height,
    weight,
    bio,
    color,
    dieteryRestrictions,
    petTypeOptions,
    petType,
    adoptionStatusOptions,
    adoptionStatus,
    hypoallergenicOptions,
    hypoallergenic,
    breedOptions,
    breed,
    handleChange,
    clearValues,
    editPet,
    image
  } = useAppContext()

  const handlePetInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({name,value})
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    if (!petName || !height || !weight || !color || !dieteryRestrictions || !bio) {
      displayAlert()
      return
    }
    if (isEditing){
      editPet()
      return
    }
    createPet()

  }


  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit pet' : 'Add pet'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow type='text' labelText='Pet name' name='petName' value={petName} handleChange={handlePetInput} />
          <FormRow type='text' name='height' value={height} handleChange={handlePetInput} />
          <FormRow type='text' name='weight' value={weight} handleChange={handlePetInput} />
          <FormRow type='text' name='bio' value={bio} handleChange={handlePetInput} />
          <FormRow type='text' name='color' value={color} handleChange={handlePetInput} />
          <FormRow type='text' labelText='Dietery restrictions' name='dieteryRestrictions' value={dieteryRestrictions} handleChange={handlePetInput} />

          <FormSelect name='petType' value={petType} petList={petTypeOptions} handleChange={handlePetInput} labelText='Pet type' />
          <FormSelect name='adoptionStatus' value={adoptionStatus} petList={adoptionStatusOptions} handleChange={handlePetInput} labelText='Adoption status' />
          <FormSelect name='hypoallergenic' value={hypoallergenic} petList={hypoallergenicOptions} handleChange={handlePetInput} labelText='Hypoallergenic' />
          <FormSelect name='breed' value={breed} petList={breedOptions} handleChange={handlePetInput} labelText='Breed' />
          <ImageUpload handleChange={handlePetInput} value={image} />


          <div className='btn-container'>
            <button className='btn btn-block submit-btn' disabled={isLoading} type='submit' onClick={handleSubmit} >Submit</button>
            <button className='btn btn-block clear-btn' onClick={(e)=>{
              e.preventDefault()
              clearValues()
            }} >Clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddPet