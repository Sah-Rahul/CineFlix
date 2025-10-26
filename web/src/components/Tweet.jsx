import React from "react";
import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useGetTweet } from "../hooks/useGetTweet";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TWEET_API_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { refreshTweets } from "../redux/slice/tweetSlice";

const Tweet = () => {
  const dispatch = useDispatch();
  const { tweets, loading: tweetsLoading, error: tweetsError } = useGetTweet();
  const { user } = useSelector((store) => store.user);

  const handleLikeAndDislike = async (tweetId) => {
    try {
      const { data } = await axios.put(
        `${TWEET_API_POINT}/like/${tweetId}`,
        {},
        { withCredentials: true }
      );

      if (data?.action === "liked") {
        toast.success("Tweet Liked");
      } else if (data?.action === "unliked") {
        toast.success("Like Removed");
      }

      dispatch(refreshTweets());
    } catch (error) {
      console.error("Tweet Error:", error);
      toast.error(error.response?.data?.message || "Tweet like failed.");
    }
  };

  const handleBookmark = async (tweetId) => {
    try {
      const { data } = await axios.put(
        `${TWEET_API_POINT}/bookmark/${tweetId}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      dispatch(refreshTweets());
    } catch (error) {
      console.error("Bookmark Error:", error);
      toast.error(error.response?.data?.message || "Failed to bookmark tweet.");
    }
  };

  const handleDelete = async (tweetId) => {
    try {
      const { data } = await axios.delete(
        `${TWEET_API_POINT}/delete-tweet/${tweetId}`,
        { withCredentials: true }
      );
      toast.success("Tweet deleted successfully");
      dispatch(refreshTweets());
    } catch (error) {
      console.error("Delete Tweet Error:", error);
      toast.error(error.response?.data?.message || "Failed to delete tweet");
    }
  };

  return (
    <div className="mx-auto bg-white p-4 my-4 border-t-1 border-gray-200 transition">
      {tweets.map((tweet) => (
        <div key={tweet._id} className="mb-6">
          <div className="flex items-center text-black space-x-3">
            <img
              src="https://imgs.search.brave.com/VAWLpqOIM1TGZM0-JRDBW-vPwRyJu4mctHh5wQj0cq8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFrcmI1STVJNUwu/cG5n"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-sm sm:text-base">
                  {tweet?.userID?.fullname}
                </h2>
                <h2 className="text-black text-xs">{tweet?.userID?.email}</h2>
              </div>
              <p className="text-black text-xs sm:text-sm">
                @{tweet?.userID?.username}
              </p>
            </div>
          </div>

          <p className="text-black text-sm sm:text-base mt-3">
            {tweet?.description}
          </p>

          <div className="flex justify-between text-gray-500 text-sm mt-4">
            <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
              <FaRegComment className="text-xl" />
              <span>{tweet.comments?.length || 0}</span>
            </button>

            <button
              onClick={() => handleLikeAndDislike(tweet?._id)}
              className="flex items-center space-x-1 cursor-pointer hover:text-pink-500"
            >
              <FaRegHeart
                className={`text-xl ${
                  tweet.like.includes(user?._id) ? "text-pink-500" : ""
                }`}
              />
              <span>{tweet.like.length}</span>
            </button>

            <button
              onClick={() => handleBookmark(tweet?._id)}
              className="flex items-center space-x-1 cursor-pointer hover:text-green-500"
            >
              <FaRegBookmark className="text-xl" />
              <span>{tweet.bookmarks.length}</span>
            </button>

            {user?._id === tweet?.userID?._id && (
              <button
                onClick={() => handleDelete(tweet?._id)}
                className="flex items-center space-x-1 cursor-pointer hover:text-red-500"
              >
                <MdDelete className="text-xl" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tweet;
