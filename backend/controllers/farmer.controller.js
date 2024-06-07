import {generateJWTToken} from '../db/generateToken.js';
import {encryptData, comparePasswords} from '../db/hashPassword.js';
import Farmer from '../models/farmer.models.js';
// Create a new farmer
const createFarmer = async (req, res) => {
    try {
        const info = req.body;
        const hash_pass = await encryptData(info.password);
        info.password = hash_pass;
        const farmer = await Farmer.create(info);

        res.status(201).send({
            farmer:"Farmer registered successfully",
            userId:farmer._id.toString()
        });
        console.log("Farmer registered successfully")
    } catch (error) {
        res.status(500).send({ error: 'Data not inserted', message: error.message });
    }
}

// login farmer
const loginFarmer = async (req, res) => {
    try{
        const data = req.body;
        const farmer = await Farmer.findOne({email:data.email});
        if(!farmer){
            console.log("Farmer does not exists")
            res.status(401).send({message:"Farmer not registered yet!"})
        }
        else{
            if(!comparePasswords(data.password, farmer.password)) res.status(500).send({message:"Invalid credentials"})
            console.log("Farmer Logged in")
            const token =  generateJWTToken(farmer);

            res.cookie("token" , token)
            res.status(201).send({message:"Farmer Exists"});
        }
    }
    catch(error){
        res.status(500).send({message:"Invalid credentials"});
    }
}

// logout farmer
const logoutFarmer = (req, res) => {
    try{
        res.cookie("token" , "")
        res.status(201).send({message:"Logout Successfully"});
    }
    catch(error){
        res.status(500).send({message:"Invalid credentials"});
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
    loginFarmer,
    getFarmers,
    getFarmer,
    updateFarmer,
    deleteFarmer,
    logoutFarmer
}