import Farmer from "../models/farmer.models.js";
const validateFarmer = async (req, res, next) => {
    const { username, email, password, age, location } = req.body;
    const farmer = await Farmer.findOne({username,email})
    if(farmer){
        return res.status(500).send({msg:"Farmer Exists"})
    }
    if (!username || !email || !password || !age || !location) {
        console.log("All fields required!")
        return res.status(400).send('All fields are required');
    }
    next();
};

export default validateFarmer;