import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import { DISPLAY_ALERT, CLEAR_ALERT, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS, HANDLE_CHANGE, CLEAR_VALUES, CREATE_PET_BEGIN, CREATE_PET_SUCCESS, CREATE_PET_ERROR, GET_PETS_BEGIN, GET_PETS_SUCCESS,SET_EDIT_PET,DELETE_PET_BEGIN ,EDIT_PET_BEGIN,EDIT_PET_ERROR,EDIT_PET_SUCCESS,GET_USERS_BEGIN,GET_USERS_SUCCESS} from "./actions"
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    showSidebar: false,
    isEditing: false,
    petName: '',
    height: '',
    weight: '',
    bio: '',
    color: '',
    dieteryRestrictions: '',
    petTypeOptions: ['cat', 'dog'],
    petType: 'dog',
    adoptionStatusOptions: ['foster', 'adopt'],
    adoptionStatus: 'foster',
    hypoallergenicOptions: ['yes', 'no'],
    hypoallergenic: 'yes',
    breedOptions: ['poodle', 'siamese'],
    breed: 'poodle',
    pets: [],
    totalPets: 0,
    page: 1,
    editPetId:'',
    users:[],
    image:'',

}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios.create({
        baseURL: '/api/',
    })
    authFetch.interceptors.request.use((config) => {
        config.headers.common['Authorization'] = `Bearer ${state.token}`
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    authFetch.interceptors.response.use((response) => {
        return response
    }, (error) => {
        if (error.response.status === 401) {
            logoutUser()
        }
        return Promise.reject(error)
    })

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000);
    }

    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const response = await axios.post(`/api/auth/${endPoint}`, currentUser)
            const { user, token } = response.data
            dispatch({ type: SETUP_USER_SUCCESS, payload: { user, token, alertText } })
            addUserToLocalStorage({ user, token })
        } catch (error) {
            dispatch({ type: SETUP_USER_ERROR, payload: { msg: error.response.data.msg } })
        }
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('/auth/update', currentUser)
            const { user, token } = data
            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } })
            addUserToLocalStorage({ user, token })
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({ type: UPDATE_USER_ERROR, payload: { msg: error.response.data.msg } })
            }
        }
        clearAlert()
    }


    const handleChange = ({ name, value }) => {
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
    }
    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }

    const createPet = async () => {
        dispatch({ type: CREATE_PET_BEGIN })
        try {
            const { petName, height, weight, bio, color, dieteryRestrictions, petType, adoptionStatus, hypoallergenic, breed } = state
            await authFetch.post('/pets', {
                petName,
                height,
                weight,
                bio,
                color,
                dieteryRestrictions,
                petType, adoptionStatus,
                hypoallergenic,
                breed
            })
            dispatch({ type: CREATE_PET_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({ type: CREATE_PET_ERROR, payload: { msg: error.response.data.msg } })

        }
        clearAlert()
    }

    const setEditPet = (id)=>{
        dispatch({type:SET_EDIT_PET,payload:{id}})
    }
    const editPet = async()=>{
        dispatch({type:EDIT_PET_BEGIN})
        try {
            const {petName,
            height,
            weight,
            bio,
            color,dieteryRestrictions,petType,adoptionStatus,hypoallergenic,breed} = state
            await authFetch.patch(`/pets/${state.editPetId}`, {
                petName,
                height,
                weight,
                bio,
                color,
                dieteryRestrictions,
                petType, adoptionStatus,
                hypoallergenic,
                breed
            })
            dispatch({type:EDIT_PET_SUCCESS})
            dispatch({type:CLEAR_VALUES})
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({ type: EDIT_PET_ERROR, payload: { msg: error.response.data.msg } })
        }
        clearAlert()
    }
    const deletePet = async (petId)=>{
        dispatch({type:DELETE_PET_BEGIN})
        try {
            await authFetch.delete(`/pets/${petId}`)
            getPets()
        } catch (error) {
            logoutUser()
        }
    }

    const getPets = async () => {
        let url = `/pets`
        dispatch({ type: GET_PETS_BEGIN })
        try {
            const { data } = await authFetch(url)
            const { pets, totalPets,  } = data
            dispatch({ type: GET_PETS_SUCCESS, payload: { pets, totalPets,  } })
        } catch (error) {
            console.log(error.response);
        }
        clearAlert()
    }
    const getPetsBySearch = async (petType) => {
        let url = `/pets`
        let pets = []
        let totalPets = 0
        dispatch({ type: GET_PETS_BEGIN })
        try {
            const { data } = await authFetch(url)
            data.pets.forEach(pet => {
                if (pet.petType === petType){
                    pets.push(pet)
                    totalPets++
                }
            });
            dispatch({ type: GET_PETS_SUCCESS, payload: { pets, totalPets,  } })
        } catch (error) {
            console.log(error.response);
        }
        clearAlert()
    }

    const getAllUsers = async ()=>{
        dispatch({ type: GET_USERS_BEGIN })
        try {
            const {data} = await authFetch.get('/auth/stats')
            const {users } = data
            dispatch({ type: GET_USERS_SUCCESS,payload:{users}})
        } catch (error) {
            console.log(error.response);
        }
    }


    return <AppContext.Provider value={{
        ...state,
        displayAlert,
        clearAlert,
        addUserToLocalStorage,
        removeUserFromLocalStorage,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createPet,
        getPets,
        setEditPet,
        deletePet,
        editPet,
        getPetsBySearch,
        getAllUsers
    }}>
        {children}
    </AppContext.Provider>
}
const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }