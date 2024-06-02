import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
  })


const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Database connected Succesfully!")
    })
    .catch((e) => {
        console.log("Database connection failed!!!!!!" + e) 
    })
}

export default connectDB