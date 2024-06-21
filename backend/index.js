import express from 'express'
import connectDB from './db/connect.js'
import farmerRoutes from './routes/farmers.routes.js'
import shopkeeperRoutes from './routes/shopkeeper.routes.js'
import expertRoutes from './routes/expert.routes.js'
import postRoutes from './routes/post.routes.js'
import productRoutes from './routes/product.routes.js'
import chatRoutes from './routes/chat.routes.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { verifyToken } from './db/generateToken.js'
dotenv.config({
    path: './.env'
})
const app = express()
connectDB()

app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' })); // Adjust limit as per your needs
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'https://agro-star.vercel.app'],
    credentials: true
}));
app.use('/api/farmers', farmerRoutes);
app.use('/api/shopkeepers', shopkeeperRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/products', productRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/verify', verifyToken);


app.get('/', (req, res) => {
    res.send("Hi there")
})


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
