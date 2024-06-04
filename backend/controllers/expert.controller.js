import Expert from '../models/expert.models.js'

// Create a new expert
const createExpert = async (req, res) => {
    try {
        const expert = await Expert.create(req.body);
        res.status(201).send(expert);
        console.log("Expert registered successfully")
    } catch (error) {
        res.status(500).send({ error: 'Data not inserted', message: error.message });
    }
}


// Get all experts
const getExperts = async (req, res) => {
    try {
        const experts = await Expert.find();
        res.status(200).send(experts);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a expert by ID
const getExpert = async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.id);
        if (!expert) {
            return res.status(404).send('Expert not found');
        }
        res.status(200).send(expert);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update a expert by ID
const updateExpert = async (req, res) => {
    try {
        const expert = await Expert.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!expert) {
            return res.status(404).send('Expert not found');
        }
        res.status(200).send(expert);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Delete a expert by ID
const deleteExpert = async (req, res) => {
    try {
        const expert = await Expert.findByIdAndDelete(req.params.id);
        if (!expert) {
            return res.status(404).send('Expert not found');
        }
        res.status(200).send('Expert deleted');
    } catch (error) {
        res.status(500).send(error);
    }
}

export{
    createExpert,
    getExperts,
    getExpert,
    updateExpert,
    deleteExpert
}