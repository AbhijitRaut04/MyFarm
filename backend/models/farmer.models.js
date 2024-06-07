import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
  })

const farmerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    }],
    location: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});




const Farmer = mongoose.model('Farmer', farmerSchema);

export default Farmer;