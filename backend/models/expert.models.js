import mongoose from 'mongoose';

const expertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    consultations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultation'
    }]
});

const Expert = mongoose.model('Expert', expertSchema);

export default Expert;
