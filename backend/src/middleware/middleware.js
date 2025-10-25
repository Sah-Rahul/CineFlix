import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
