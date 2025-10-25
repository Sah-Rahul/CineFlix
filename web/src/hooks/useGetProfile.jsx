import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_POINT } from "../utils/constant";

export const useGetProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${USER_API_POINT}/my-profile`, {
          withCredentials: true,
        });
        setProfile(data.user);
      } catch (err) {
        console.error("Get Profile Error:", err);
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};
