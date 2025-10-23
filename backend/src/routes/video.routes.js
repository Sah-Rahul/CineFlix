import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.config.js";
import {
  getVideosByCategory,
  uploadVideo,
} from "../controllers/video.controller.js";

const upload = multer({ storage });

const videoRouter = express.Router();

videoRouter.post(
  "/upload",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadVideo
);

videoRouter.get("/", getVideosByCategory);

export default videoRouter;
