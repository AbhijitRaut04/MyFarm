import jwt from 'jsonwebtoken'
import Farmer from '../models/farmer.models.js'
import dotenv from 'dotenv'
dotenv.config({
  path: './.env'
})

const isFarmerSignin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ error: "Please Login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const farmer = await Farmer.findById(decoded.userId)
    if (farmer) {
      req.farmer = farmer;
      next();
    }
    else {
      res.status(401).send({ error: 'error' });
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({ error: error.message });
  }
};

const getLoginFarmer = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    next();
  }

  else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const farmer = await Farmer.findById(decoded.userId)
      if (farmer) {
        req.farmer = farmer;
      }
      next();
    } catch (error) {
      console.log(error)
      return res.status(401).send({ error: error.message });
    }
  }
};


export { isFarmerSignin, getLoginFarmer }