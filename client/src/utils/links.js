import { FcViewDetails } from 'react-icons/fc'
import { MdPets } from 'react-icons/md'
import { FaDog } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

const links = [
    { id: 1, text: 'all pets', path: '/dashboard', icon: <MdPets /> },
    { id: 2, text: 'admin page', path: 'stats', icon: <FcViewDetails /> },
    { id: 3, text: 'add pet', path: 'add-pet', icon: <FaDog /> },
    { id: 4, text: 'profile', path: 'profile', icon: <CgProfile /> },
]

export default links