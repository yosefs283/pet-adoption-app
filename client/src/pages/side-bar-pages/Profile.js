import React, { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../styles/wrappers/DashboardFormPage'
import {FormRow,Alert} from '../../components'


function Profile() {
  const{user,showAlert,displayAlert,updateUser,isLoading} = useAppContext()
  const [email,setEmail] = useState(user?.email)
  const [firstName,setFirstName] = useState(user?.firstName)
  const [lastName,setLastName] = useState(user?.lastName)
  const [phone,setPhone] = useState(user?.phone)

  const handleSubmit = (e)=>{
    e.preventDefault()
    if (!firstName||!lastName||!email||!phone){
      displayAlert()
      return
    }
    updateUser({firstName,lastName,email,phone})
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit} >
        <h3>Profile</h3>
        {showAlert&&<Alert/>}
        <div className='form-center'>
          <FormRow type='text' labelText='First name' name='firstName' value={firstName} handleChange={(e)=>setFirstName(e.target.value)} />
          <FormRow type='text' labelText='Last name' name='lastName' value={lastName} handleChange={(e)=>setLastName(e.target.value)} />
          <FormRow type='email' labelText='Email' name='email' value={email} handleChange={(e)=>setEmail(e.target.value)} />
          <FormRow type='tel' labelText='Phone' name='phone' value={phone} handleChange={(e)=>setPhone(e.target.value)} />
          <button className='btn btn-block' type='submit' disabled={isLoading}  >
            {isLoading?'Please wait...':'Save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile