import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../styles/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'

const initialState = {
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: '',
  isMember: true,
}

function Register() {
  const [values, setValues] = useState(initialState)
  const [btnDisable,setBtnDisable] = useState(false)
  const navigate = useNavigate()
  const { user, showAlert, displayAlert, clearAlert,setupUser } = useAppContext()

  const toggleMember = () => {
    setValues({...initialState,  isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    setBtnDisable(true)
    e.preventDefault()
    clearAlert()
    const { firstName, lastName, password, confirmPassword, phone, email, isMember } = values
    if (confirmPassword) {
      if (!email || !password || (!isMember && (!confirmPassword || !firstName || !lastName || !phone))) {
        displayAlert()
        setTimeout(() => {
          setBtnDisable(false)
        }, 3000);
        return
      }
      if (password !== confirmPassword) {
        displayAlert()
        setTimeout(() => {
          setBtnDisable(false)
        }, 3000);
        return
      }
    }
    const currentUser = { firstName, lastName, password, phone, email }
    if (isMember) {
      setupUser({currentUser,endPoint:'login',alertText:'Logging in...'})
    } else {
      setupUser({currentUser,endPoint:'register',alertText:'User created! redirecting to login...'})
    }
    setTimeout(() => {
      setBtnDisable(false)
    }, 3000);
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000);
    }

  }, [user, navigate])

  return (
    <Wrapper className='full-page' >
      <form className='form' onSubmit={onSubmit} >
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <>
            <FormRow type='text' labelText='First name' name='firstName' value={values.firstName} handleChange={handleChange} />
            <FormRow type='text' labelText='Last name' name='lastName' value={values.lastName} handleChange={handleChange} />
            <FormRow type='tel' name='phone' value={values.phone} handleChange={handleChange} />
          </>
        )}

        <FormRow type='email' name='email' value={values.email} handleChange={handleChange} />
        <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
        {!values.isMember && (<FormRow type='password' labelText='Confirm password' name='confirmPassword' value={values.confirmPassword} handleChange={handleChange} />)}
        <button type='submit' className='btn btn-block' disabled={btnDisable}>Submit</button>
        <p>
          {values.isMember ? `Don't have an account yet?` : 'Already have an account?'}
          <button type='button' onClick={toggleMember} className='member-btn'  >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register