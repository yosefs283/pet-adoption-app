import express from "express";
import 'express-async-errors'
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authenticateUser from './middleware/authenticate.js'
import dotenv from 'dotenv'
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import petsRouter from './routes/petsRoutes.js'

const app = express()
dotenv.config()


app.use(express.json())

app.get('/', (req, res) => {
    res.json({msg:'welcome'})
})
app.get('/api', (req, res) => {
    res.json({msg:'API'})
})

app.use('/api/auth',authRouter)
app.use('/api/pets',authenticateUser,petsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000


const start = async () => {
    try {
        await connectDB(process.env.CONNECTION_URL)
        app.listen(port, () => {
            console.log(`server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()