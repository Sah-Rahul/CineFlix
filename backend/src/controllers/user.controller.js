import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { tweetModel } from "../models/tweet.model.js";
import { userModel } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: `Welcome back ${user.fullname}`,
      user: {
        user,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getOthersUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const otherUsers = await userModel
      .find({ _id: { $ne: currentUserId } })
      .select("-password");

    return res.status(200).json({
      success: true,
      users: otherUsers,
      message: "Other users fetched successfully",
    });
  } catch (error) {
    console.error("Get Others Users Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const followUser = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { id: targetUserId } = req.params;

    if (currentUserId.toString() === targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currentUser = await userModel.findById(currentUserId);
    const targetUser = await userModel.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.following.includes(targetUserId)) {
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(currentUserId);

      await currentUser.save();
      await targetUser.save();

      return res.status(200).json({
        message: `${currentUser.fullname} unfollowed ${targetUser.fullname}`,
      });
    }

    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({
      message: `${currentUser.fullname} followed ${targetUser.fullname}`,
    });
  } catch (error) {
    console.error("Follow User Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const unFollowUser = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { id: targetUserId } = req.params;

    if (currentUserId.toString() === targetUserId) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    const currentUser = await userModel.findById(currentUserId);
    const targetUser = await userModel.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!currentUser.following.includes(targetUserId)) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    currentUser.following.pull(targetUserId);
    targetUser.followers.pull(currentUserId);

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({
      message: `${currentUser.fullname} unfollowed ${targetUser.fullname}`,
    });
  } catch (error) {
    console.error("Unfollow User Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
