import videoModel from "../models/video.model.js";

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, category, releaseDate } = req.body;

    const video = req.files.video?.[0];
    const thumbnail = req.files.thumbnail?.[0];
  console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    if (!video || !thumbnail) {
      return res.status(400).json({ message: "Video and thumbnail required" });
    }

    const newVideo = await videoModel.create({
      title,
      description,
      category,
      releaseDate,
      videoUrl: video.path,
      thumbnailUrl: thumbnail.path,
    });

    res.status(201).json(newVideo);
  } catch (err) {
        console.error("Upload Error:", err);  // 👈 Add this
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

export const getVideosByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const allowed = ["now_playing", "popular", "top_rated", "upcoming"];
    if (!allowed.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const videos = await videoModel
      .find({ category })
      .sort({ releaseDate: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
