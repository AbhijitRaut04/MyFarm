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
    stock: {
        type: Number,
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
