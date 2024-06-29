import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

//configure
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const imageUpload = async (req, res, next) => {
  try {
    if (!req.file) { 
      req.body.imageUrl = ""
      next(); 
    }
    else {
      const filePath = req.file.path;
      if (!filePath) {
        req.body.imageUrl = ""
      }
      else {
        const response = await cloudinary.uploader.upload(filePath, { resource_type: "auto" })
        fs.unlinkSync(filePath)
        req.body.imageUrl = response.secure_url;
      }
      next()
    }
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path) // remove the locally saved temporary file as the upload operation got failed
    return res.status(500).send({ Error: error.message, message: "Image upload failed"})
  }
}

export default imageUpload