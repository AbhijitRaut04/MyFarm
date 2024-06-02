import express from 'express'
import connectDB from './db/connect.js'
import farmerRoutes from './routes/farmers.routes.js'
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
const app = express()
connectDB()

app.use(express.json());
app.use('/api/farmers', farmerRoutes);

app.get('/', (req, res) => {
    res.send("Hi there")
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})