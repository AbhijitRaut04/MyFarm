import Farmer from '../models/farmer.models.js';

// Create a new farmer
const createFarmer = async (req, res) => {
    try {
        const farmerData = req.body;
        const farmer = await Farmer.create(farmerData);
        res.status(201).send(farmer);
        console.log("Farmer registered successfully")
    } catch (error) {
        res.status(500).send({ error: 'Data not inserted', message: error.message });
    }
}

// Get all farmers
const getFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.status(200).send(farmers);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a farmer by ID
const getFarmer = async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.id);
        if (!farmer) {
            return res.status(404).send('Farmer not found');
        }
        res.status(200).send(farmer);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update a farmer by ID
const updateFarmer = async (req, res) => {
    try {
        const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!farmer) {
            return res.status(404).send('Farmer not found');
        }
        res.status(200).send(farmer);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Delete a farmer by ID
const deleteFarmer = async (req, res) => {
    try {
        const farmer = await Farmer.findByIdAndDelete(req.params.id);
        if (!farmer) {
            return res.status(404).send('Farmer not found');
        }
        res.status(200).send('Farmer deleted');
    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    createFarmer,
    getFarmers,
    getFarmer,
    updateFarmer,
    deleteFarmer
}