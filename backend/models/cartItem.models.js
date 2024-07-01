import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: String
    },
    status: {
        type: String,
        enum: ['Delivered', 'Cancelled', 'Dispatched', 'Ordered', 'InCart'],
        default: 'InCart',
        required: true
    }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;
