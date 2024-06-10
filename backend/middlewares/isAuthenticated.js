import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
  })

const isSignin = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).send({ error: "Please Login"});
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decoded) {
        next();
      }
      else {
        res.status(401).send({ error: 'error'});
      }
    } catch (error) {
      res.status(401).send({ error: error.message});
    }
  };

export default isSignin