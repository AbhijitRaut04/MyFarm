import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
    expert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expert',
        required: true
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;
