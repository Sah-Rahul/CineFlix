import { useEffect, useState } from "react";
import axios from "axios";
import { TWEET_API_POINT } from "../utils/constant";

export const useGetFollowingTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTweets = async () => {
    try {
      const { data } = await axios.get(`${TWEET_API_POINT}/following-tweet`, {
        withCredentials: true,
      });
      console.log("Following Tweets:", data);
      setTweets(data?.tweets || []);
    } catch (err) {
      console.error("Fetch Following Tweets Error:", err);
      setError(
        err.response?.data?.message || "Failed to fetch following tweets"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return { tweets, fetchTweets, loading, error };
};
