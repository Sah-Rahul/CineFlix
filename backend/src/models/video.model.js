import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: {
    type: String,
    enum: ["now_playing", "popular", "top_rated", "upcoming"],
    required: true,
  },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  releaseDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;
