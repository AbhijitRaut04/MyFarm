import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
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
    TrackingId: {
        type: String
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
