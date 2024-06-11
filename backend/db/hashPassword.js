import bcrypt from 'bcrypt'
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
    // problem in compare password
    try{
        const result = await bcrypt.compare(password, hash);
        return result;
    }
    catch(error){
        console.log(error)
        return false;
    }
}


export { encryptData, comparePasswords}