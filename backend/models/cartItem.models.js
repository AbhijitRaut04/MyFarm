import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    title: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    amount: {
        type: Number
    },
    GST: {
        type: Number
    },
    platformFee: {
        type: Number
    }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;
