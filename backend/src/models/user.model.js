import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model("User", userSchema);
