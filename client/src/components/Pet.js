import React from 'react'
import { MdPets } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../styles/wrappers/Pet'
import PetInfo from './PetInfo'
import PetModal from '../components/Modal'

function Pet({ petName, petType, bio, _id, adoptionStatus, color, height, weight, dieteryRestrictions, breed,hypoallergenic }) {
  const { user, setEditPet, deletePet } = useAppContext()
  return (
    <Wrapper>
      <header>
        <div className='info'>
          <h5>name: {petName}</h5>
          <p>type: {petType}</p>
          <p>status: {adoptionStatus}</p>
        </div>
      </header>
      <div className='content'>
        <div>
          <PetInfo icon={<MdPets />} text={bio} />

        </div>
        {user.isAdmin && <footer>
          <div className='actions'>
            <Link className='btn edit-btn' to='add-pet' onClick={() => setEditPet(_id)}>
              Edit
            </Link>
            <button className='btn delete-btn' type='button' onClick={() => deletePet(_id)}>Delete</button>
            {/* <button className='btn' style={{marginLeft:'5px'}}>Info</button> */}

          </div>
        </footer>}
        <PetModal petName={petName}
          petType={petType} 
          bio={bio} 
          adoptionStatus={adoptionStatus} 
          color={color}
          height={height}
          weight={weight}
          dieteryRestrictions={dieteryRestrictions}
          breed={breed}
          />

      </div>
    </Wrapper>
  )
}

export default Pet