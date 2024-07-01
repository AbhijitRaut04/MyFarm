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
    if (req.file) {
      const filePath = req.file.path;
      if (!filePath) {
        req.body.imageUrl = "";
      } else {
        const response = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        req.body.imageUrl = response.secure_url;
      }
      next();
    } else if (req.files) {
      let images = [];
      const uploadPromises = req.files.map(async file => {
        const filePath = file.path;
        if (filePath) {
          const response = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          images.push(response.secure_url);
        }
      });
      await Promise.all(uploadPromises);
      if(images.length == 1) req.body.imageUrl = images[0];
      else req.body.images = images;
      next();
    } else {
      req.body.imageUrl = "";
      req.body.images = [];
      next();
    }
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    if (req.files) {
      req.files.forEach(file => {
        if (file.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    return res.status(500).send({ Error: error.message, message: "Image upload failed" });
  }
};



export default imageUpload