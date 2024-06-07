import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
  })

const generateJWTToken = (farmer) => {
    return jwt.sign({
        userId : farmer._id.toString(),
        userName : farmer.username,
        email : farmer.email
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn:"5d"
    }
    );
}

const verifyToken = (req, res) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).send({ error: "Please Login", isLoggedIn : false});
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded; 
      res.status(201).send({message: "Logged in", isLoggedIn : true})
    } catch (error) {
      res.status(401).send({ error: 'Invalid token' });
    }
  };


export {generateJWTToken, verifyToken}