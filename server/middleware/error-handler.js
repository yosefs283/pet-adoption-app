const errorHandlerMiddleware = (err,req,res,next)=>{
    const defaultError = err.message
    if (err.name === 'ValidationError'){
        res.status(400).json({msg:err.message})
    }
    if (err.code && err.code === 11000){
        res.status(400).json({msg:'Email already used'})
    }else{
        res.status(400).json({msg:defaultError || 'Something went wrong'})
    }
    
}

export default errorHandlerMiddleware