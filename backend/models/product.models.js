import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Seeds', 'Seedlings', 'Medicines', 'Equipment'],
        required: true
    },
    shopkeeper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shopkeeper',
        required: true
    },
    rating: {
        star1: {
            type: Number,
            default: 0
        },
        star2: {
            type: Number,
            default: 0
        },
        star3: {
            type: Number,
            default: 0
        },
        star4: {
            type: Number,
            default: 0
        },
        star5: {
            type: Number,
            default: 0
        }
    },
    reviews: [{
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Farmer',
            required: true
        },
        image: String,
        description: String,
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            default: 5
        }
    }]
});

const Product = mongoose.model('Product', productSchema);

export default Product;
