import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    },
    media: {
        type: String
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    reacts: [{
        reactedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Farmer'
        },
        emoji: {
            type: String,
            enum: ["❤️","🙏","😂","👍","😍"]
        }
    }],
    message: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
