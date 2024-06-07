import jwt from 'jsonwebtoken'

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


export default generateJWTToken