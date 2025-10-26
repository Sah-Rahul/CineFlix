import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/slice/userSlice";

export const useGetOthersUser = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${USER_API_POINT}/get-other-user`, {
          withCredentials: true,
        });
         
        setUsers(data?.users);
        dispatch(getOtherUsers(data?.users));
      } catch (err) {
        console.error("Get Profile Error:", err);
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return { users, loading, error };
};
