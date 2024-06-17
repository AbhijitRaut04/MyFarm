import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
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
    orderedAt: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number
    },
    GST: {
        type: Number
    },
    platformFee: {
        type: Number
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
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
