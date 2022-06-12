import { DISPLAY_ALERT, CLEAR_ALERT, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS, HANDLE_CHANGE, CLEAR_VALUES, CREATE_PET_BEGIN, CREATE_PET_SUCCESS, CREATE_PET_ERROR, GET_PETS_BEGIN, GET_PETS_SUCCESS ,SET_EDIT_PET,DELETE_PET_BEGIN,EDIT_PET_BEGIN,EDIT_PET_ERROR,EDIT_PET_SUCCESS, GET_USERS_BEGIN, GET_USERS_SUCCESS} from "./actions"
import { initialState } from "./appContext"


const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return { ...state, showAlert: true, alertType: 'danger', alertText: 'Check fields again' }
    }
    if (action.type === CLEAR_ALERT) {
        return { ...state, showAlert: false, alertType: '', alertText: '' }
    }
    if (action.type === SETUP_USER_BEGIN) {
        return { ...state,  }
    }
    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            
            showAlert: true,
            token: action.payload.token,
            user: action.payload.user,
            alertType: 'success',
            alertText: action.payload.alertText
        }
    }
    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar,
        }
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            token: null,
            user: null
        }
    }



    if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            token: action.payload.token,
            user: action.payload.user,
            alertType: 'success',
            alertText: 'User profile updated'
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if (action.type === HANDLE_CHANGE) {
        return {
            ...state,
            [action.payload.name]: action.payload.value
        }
    }
    if (action.type === CLEAR_VALUES) {
        const initialState = {
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
            editPetId:''
        }
        return {
            ...state,
            ...initialState
        }
    }

    if (action.type === CREATE_PET_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === CREATE_PET_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Pet created!'
        }
    }
    if (action.type === CREATE_PET_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === GET_PETS_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false
        }
    }
    if (action.type === GET_PETS_SUCCESS) {
        return {
            ...state,
            isLoading:false,
            pets: action.payload.pets,
            totalPets:action.payload.totalPets
        }
    }

    if (action.type === SET_EDIT_PET){
        const pet = state.pets.find((pet)=>pet._id === action.payload.id)
        const { _id,petName,height,weight,bio,color,dieteryRestrictions,petType,adoptionStatus,hypoallergenic,breed} = pet
        return {
            ...state,
            isEditing:true,
            editPetId:_id,
            petName,
            height,
            weight,
            bio,
            color,
            dieteryRestrictions,
            petType,
            adoptionStatus,
            hypoallergenic,
            breed
        }
    }

    if (action.type === DELETE_PET_BEGIN){
        return{
            ...state,
            isLoading:true
        }
    }

    if (action.type === EDIT_PET_BEGIN){
        return {
            ...state,
            isLoading:true
        }
    }
    if (action.type === EDIT_PET_SUCCESS){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Pet edited!'
        }
    }
    if (action.type === EDIT_PET_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === GET_USERS_BEGIN){
        return{
            ...state,
            isLoading:true,
            showAlert:false
        }
    }
    if (action.type === GET_USERS_SUCCESS){
        return{
            ...state,
            isLoading:false,
            showAlert:false,
            users:action.payload.users
        }
    }
    throw new Error(`no such action : ${action.type}`)
}

export default reducer