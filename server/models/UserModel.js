import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator:validator.isEmail,
            message:'Please provide a valid email'
        }},
    password: { type: String, required: true, minlength: 3,select:false },
    phone: { type: Number, required: true },
    isAdmin:{type:Boolean,default:false}
})

UserSchema.pre('save',async function(){
    if (!this.isModified('password')){
        return
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePasswords = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}

export default mongoose.model('User', UserSchema)