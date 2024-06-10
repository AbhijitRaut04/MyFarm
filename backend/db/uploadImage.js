import cloudinary from "cloudinary";
import dotenv from 'dotenv'
dotenv.config({path: './.env'})

//configure
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const imageUpload = async (req, res) => {
    // console.log("Image details", req.files);
    try {
      const result = await cloudinary.uploader.upload(req.files.image.path);
      console.log("Uplaod Image", result);
      res.json({
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

export default imageUpload