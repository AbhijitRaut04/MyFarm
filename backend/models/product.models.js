import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
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
    rating: [{
        ratedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Farmer'
        },
        rate: {
            type: String,
            enum:["1","2","3","4","5"]
        }
    }],
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
