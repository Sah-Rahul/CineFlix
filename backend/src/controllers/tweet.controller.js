import mongoose from "mongoose";
import { tweetModel } from "../models/tweet.model.js";
import { userModel } from "../models/user.model.js";

export const createTweet = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description)
      return res.status(400).json({ message: "Description is required" });

    const newTweet = await tweetModel.create({
      description,
      userID: req.user._id,
    });

    return res.status(201).json({
      message: "Tweet created successfully",
      tweet: newTweet,
      createdBy: req.user._id,
    });
  } catch (error) {
    console.error("Create Tweet Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await tweetModel.findById(id);
    if (!tweet) return res.status(404).json({ message: "Tweet not found" });

    if (tweet.userID.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this tweet" });
    }

    await tweetModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Tweet deleted successfully" });
  } catch (error) {
    console.error("Delete Tweet Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const likeTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const tweet = await tweetModel.findById(id);
    if (!tweet) return res.status(404).json({ message: "Tweet not found" });

    let action = "";

    if (tweet.like.includes(userId)) {
      tweet.like.pull(userId);
      action = "unliked";
    } else {
      if (tweet.dislike.includes(userId)) {
        tweet.dislike.pull(userId);
      }
      tweet.like.push(userId);
      action = "liked";
    }

    await tweet.save();

    return res.status(200).json({
      message: "Tweet like status updated successfully",
      tweet,
      action,
    });
  } catch (error) {
    console.error("Like Tweet Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const dislikeTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const tweet = await tweetModel.findById(id);
    if (!tweet) return res.status(404).json({ message: "Tweet not found" });

    if (tweet.dislike.includes(userId)) {
      tweet.dislike.pull(userId);
    } else {
      if (tweet.like.includes(userId)) tweet.like.pull(userId);
      tweet.dislike.push(userId);
    }

    await tweet.save();
    return res
      .status(200)
      .json({ message: "Tweet disliked successfully", tweet });
  } catch (error) {
    console.error("Dislike Tweet Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const bookmarkTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const tweet = await tweetModel.findById(id);
    const user = await userModel.findById(userId);

    if (!tweet || !user)
      return res.status(404).json({ message: "Tweet or User not found" });

    if (tweet.bookmarks.includes(userId)) {
      tweet.bookmarks.pull(userId);
      user.bookmarks.pull(id);
      await tweet.save();
      await user.save();
      return res
        .status(200)
        .json({ message: "Bookmark removed successfully", tweet });
    }

    tweet.bookmarks.push(userId);
    user.bookmarks.push(id);

    await tweet.save();
    await user.save();

    return res
      .status(200)
      .json({ message: "Tweet bookmarked successfully", tweet });
  } catch (error) {
    console.error("Bookmark Tweet Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllTweetsFeed = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const currentUser = await userModel.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const usersToFetch = [currentUserId, ...currentUser.following];

    const tweets = await tweetModel
      .find({ userID: { $in: usersToFetch } })
      .sort({ createdAt: -1 })
      .populate("userID", "fullname email username");

    if (tweets.length === 0) {
      return res.status(404).json({ message: "No tweets found." });
    }

    return res.status(200).json({
      success: true,
      message: " tweets fetched successfully",
      tweets,
    });
  } catch (error) {
    console.error("Get Feed Tweets Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFollowingTweets = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const currentUser = await userModel.findById(currentUserId).select("following");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.following.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You are not following anyone",
        tweets: [],
      });
    }

    const followingIds = currentUser.following.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    const tweets = await tweetModel
      .find({ userID: { $in: followingIds } })
      .sort({ createdAt: -1 })
      .populate("userID", "fullname username");

    return res.status(200).json({
      success: true,
      message: "Tweets from following users fetched successfully",
      tweets,
    });
  } catch (error) {
    console.error("Get Following Tweets Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

