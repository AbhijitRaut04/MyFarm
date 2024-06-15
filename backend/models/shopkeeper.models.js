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
    }],
    orders: [{
        items: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }],
        orderedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Farmer'
        },
        status: {
            type: String,
            enum: ['Delivered', 'Cancled', 'Dispatched', 'Ordered'],
            default: 'Ordered',
            required: true
        },
        TrackingId: {
            type: String
        }
    }]
});

const Shopkeeper = mongoose.model('Shopkeeper', shopkeeperSchema);

export default Shopkeeper;
