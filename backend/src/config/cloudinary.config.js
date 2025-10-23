import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    return {
      folder: "mern-movie-project",
      resource_type: isVideo ? "video" : "image",
      allowed_formats: isVideo ? ["mp4"] : ["jpg", "jpeg", "png"],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

export { cloudinary, storage };
