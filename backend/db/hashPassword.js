import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
  })


const encryptData = async (password) => {

    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_pass = await bcrypt.hash(password, saltRound);
        return hash_pass;
    }
    catch(error){
        console.log("Hashing password error", error);
        return null;
    }
}


const comparePasswords = async(password, hash) => {
    return await bcrypt.compare(password, hash);
}


export { encryptData, comparePasswords}