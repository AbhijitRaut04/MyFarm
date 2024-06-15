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
    image : {
        type : String,
        required : true
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
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
