import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    message: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
