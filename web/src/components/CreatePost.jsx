import React, { useState, useEffect } from "react";
import { FaRegImage } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { refreshTweets } from "../redux/slice/tweetSlice";
import { TWEET_API_POINT } from "../utils/constant";
import { useGetFollowingTweets } from "../hooks/useGetFollowingTweet";
import { useGetTweet } from "../hooks/useGetTweet";
 
const CreatePost = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState("forYou");

  // Custom hooks
  const { tweets: allTweets, fetchTweets: fetchAllTweets, loading: loadingAll } = useGetTweet();
  const { tweets: followingTweets, fetchTweets: fetchFollowingTweets, loading: loadingFollowing } =
    useGetFollowingTweets();

  // Final tweets shown
  const [tweets, setTweets] = useState([]);

  // Merge tweets for "For You"
  useEffect(() => {
    if (activeTab === "forYou") {
      const merged = [...allTweets, ...followingTweets];
      const uniqueTweets = merged.filter(
        (tweet, index, self) => index === self.findIndex((t) => t._id === tweet._id)
      );
      setTweets(uniqueTweets);
    } else {
      setTweets(followingTweets);
    }
  }, [activeTab, allTweets, followingTweets]);

  // Create tweet
  const handlePost = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(
        `${TWEET_API_POINT}/create-tweet`,
        { description: text },
        { withCredentials: true }
      );
      toast.success("Tweet created successfully!");
      setText("");
      dispatch(refreshTweets());
      fetchAllTweets(); // update immediately
    } catch (error) {
      console.error("Tweet Error:", error);
      toast.error(error.response?.data?.message || "Tweet failed.");
    }
  };

  const loading = activeTab === "forYou" ? loadingAll : loadingFollowing;

  return (
    <div className="w-full bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("forYou")}
            className={`flex-1 py-4 font-semibold ${
              activeTab === "forYou" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={`flex-1 py-4 font-semibold ${
              activeTab === "following" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
            }`}
          >
            Following
          </button>
        </div>

        {/* Create Post */}
        {activeTab === "forYou" && (
          <div className="flex space-x-3 p-4 border-b border-gray-200">
            <img
              src="https://imgs.search.brave.com/95n4UMmsoiDlLaBIZ-TbsVepS4B6OHl3M55GbwT0GEs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC83Lzgv/Yy8xMjMyNDQxLTM4/NDB4MjE2MC1kZXNr/dG9wLTRrLWdvdGhp/Yy1hbmltZS13YWxs/cGFwZXIuanBn"
              alt="User"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col flex-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What is happening?!"
                rows="3"
                className="w-full resize-none outline-none text-lg bg-transparent"
              />
              <div className="flex items-center justify-between mt-3">
                <button className="text-blue-500 text-xl hover:bg-blue-100 p-2 rounded-full">
                  <FaRegImage />
                </button>
                <button
                  onClick={handlePost}
                  disabled={!text.trim()}
                  className="bg-blue-500 text-white font-bold px-5 py-2 rounded-full disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default CreatePost;
