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
      return res.status(401).send({ message: "Please Login", isLoggedIn : false});
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decoded) {
        console.log("JWT Token Verified")
        res.status(201).send({message: "Logged in",farmer:decoded, isLoggedIn : true});
      }
      else {
        res.status(401).send({ error: 'Invalid token', isLoggedIn : false });
      }
    } catch (error) {
      res.status(401).send({ error: 'Invalid token', isLoggedIn : false });
    }
  };


export {generateJWTToken, verifyToken}