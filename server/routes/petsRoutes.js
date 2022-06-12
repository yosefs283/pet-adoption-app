import express from 'express'
import {createPet,deletePet,updatePet,getAllPets,getPetByID} from '../controllers/petsController.js'
import fileUpload from '../middleware/file-upload.js'

const router = express.Router()
router.route('/').post(fileUpload.single('image'),createPet).get(getAllPets)

router.route('/:id').delete(deletePet).patch(updatePet).get(getPetByID)
export default router