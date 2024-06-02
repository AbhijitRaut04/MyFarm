import mongoose from 'mongoose';

const shopkeeperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    shopName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const Shopkeeper = mongoose.model('Shopkeeper', shopkeeperSchema);

export default Shopkeeper;
