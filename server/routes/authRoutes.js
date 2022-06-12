import express from 'express'
import { register,login,update,getAllUsers } from '../controllers/authController.js'
import authenticateUser from '../middleware/authenticate.js'
const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/update').patch(authenticateUser,update)
router.route('/stats').get(getAllUsers)

export default router