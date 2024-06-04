import Shopkeeper from '../models/shopkeeper.models.js';

// Create a new shopkeeper
const createShopkeeper = async (req, res) => {
    try {
        const shopkeeperData = req.body;
        const shopkeeper = await Shopkeeper.create(shopkeeperData);
        res.status(201).send(shopkeeper);
        console.log("Shopkeeper registered successfully")
    } catch (error) {
        res.status(500).send({ error: 'Data not inserted', message: error.message });
    }
}

// Get all shopkeepers
const getShopkeepers = async (req, res) => {
    try {
        const shopkeepers = await Shopkeeper.find();
        res.status(200).send(shopkeepers);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a shopkeer by ID
const getShopkeeper = async (req, res) => {
    try {
        const shopkeeper = await Shopkeeper.findById(req.params.id);
        if (!shopkeeper) {
            return res.status(404).send('Shopkeeper not found');
        }
        res.status(200).send(shopkeeper);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update a shopkeeper by ID
const updateShopkeeper = async (req, res) => {
    try {
        const shopkeeper = await Shopkeeper.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!shopkeeper) {
            return res.status(404).send('Shopkeeper not found');
        }
        res.status(200).send(shopkeeper);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Delete a shopkeeper by ID
const deleteShopkeeper = async (req, res) => {
    try {
        const shopkeeper = await Shopkeeper.findByIdAndDelete(req.params.id);
        if (!shopkeeper) {
            return res.status(404).send('Shopkeeper not found');
        }
        res.status(200).send('Shopkeeper deleted');
    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    createShopkeeper,
    getShopkeepers,
    getShopkeeper,
    updateShopkeeper,
    deleteShopkeeper
}