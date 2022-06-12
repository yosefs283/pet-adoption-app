import mongoose from "mongoose";

const PetSchema = mongoose.Schema({
    petName:{
        type:String,
        trim:true,
        required:[true,'Please enter name']
    },
    petType:{
        type:String,
        enum:['cat','dog'],
        default:'dog'
    },
    adoptionStatus:{
        type:String,
        enum:['foster','adopt'],
        default:'foster'
    },
    height:{
        type:String,
        required:[true,'Please enter height']
    },
    weight:{
        type:String,
        required:[true,'Please enter weight']
    },
    color:{
        type:String,
        required:[true,'Please enter color']
    },
    bio:{
        type:String,
        required:[true,'Please enter bio about the pet']
    },
    hypoallergenic:{
        type:Boolean,
        enum:['yes','no'],
        default:'yes'
    },
    dieteryRestrictions:{
        type:String,
        required:[true,'Please enter any dietery restrictions if exist,none if no restrictions']
    },
    breed:{
        type:String,
        enum:['poodle','siamese'],
        default:'poodle'
    }
})


export default mongoose.model('Pet', PetSchema)