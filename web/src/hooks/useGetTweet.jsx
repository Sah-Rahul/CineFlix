import { useEffect, useState } from "react";
import axios from "axios";
import { TWEET_API_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/slice/tweetSlice";

export const useGetTweet = () => {
  const dispatch = useDispatch();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refresh } = useSelector((store) => store.tweet);

  const fetchTweets = async () => {
    try {
      const { data } = await axios.get(`${TWEET_API_POINT}/get-all-tweet`, {
        withCredentials: true,
      });
      setTweets(data?.tweets || []);
      dispatch(getAllTweets(data?.tweets || []));
    } catch (err) {
      console.error("Get All Tweets Error:", err);
      setError(err.response?.data?.message || "Failed to fetch tweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, [refresh]);

  return { tweets, setTweets, fetchTweets, loading, error };
};
