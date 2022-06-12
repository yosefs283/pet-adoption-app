import UserModel from "../models/UserModel.js"


const register = async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body

    if (!firstName || !lastName || !email || !password || !phone) {
        throw new Error('Please provide all values')
    }
    const user = await UserModel.create({ firstName, lastName, email, password, phone })
    const token = user.createJWT()
    res.status(201).json({
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin
        }
        , token
    })

}
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new Error('Please provide all values')
    }
    const user = await UserModel.findOne({ email }).select('+password')
    if (!user) {
        throw new Error('Email or password are invalid')
    }
    const isPasswordCorrect = await user.comparePasswords(password)
    if (!isPasswordCorrect) {
        throw new Error('Email or password are invalid')
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(200).json({ user, token })
}


const update = async (req, res) => {
    const { email, firstName, lastName, phone } = req.body
    if (!firstName || !lastName || !email || !phone) {
        throw new Error('Please provide all values')
    }
    const user = await UserModel.findOne({_id:req.user.userId})
    user.email= email
    user.firstName= firstName
    user.lastName= lastName
    user.phone= phone
    await user.save()
    const token = user.createJWT()
    res.status(200).json({ user, token })

    res.send('update')
}
const getAllUsers = async (req, res) => {
    const users = await UserModel.find()
    res.status(200).json({users})
}
export { register, login, update,getAllUsers }