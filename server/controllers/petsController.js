import PetsModel from "../models/PetsModel.js"

const createPet = async (req, res) => {
    const { petName, height, weight, color, bio, dieteryRestrictions } = req.body
    if (!petName || !height || !weight || !color ||!dieteryRestrictions||!bio) {
        throw new Error('Please provide all values')
    }
    const pet =await PetsModel.create(req.body)
    res.status(201).json({pet})
    res.send('create pet')
}
const getAllPets = async (req, res) => {
    const pets = await PetsModel.find({})
    res.status(200).json({pets,totalPets:pets.length})
}
const updatePet = async (req, res) => {
    console.log(req.params);
    const {id:petId} = req.params
    const pet = await PetsModel.findOne({_id:petId})
    const updatedPet = await PetsModel.findOneAndUpdate({_id:petId},req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({updatedPet})
}
const deletePet = async (req, res) => {
    const {id:petId} = req.params
    const pet = await PetsModel.findOne({_id:petId})
    await pet.remove()
    res.status(200).json({msg:'Pet removed!'})
}

const getPetByID = async (req,res)=>{
    const {id:petId} = req.params
    const pet = await PetsModel.findOne({_id:petId})
    res.status(200).json({pet})
}
export { createPet, deletePet, updatePet, getAllPets,getPetByID }