import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetOthersUser } from "../hooks/useOthersUser";
import { useGetTweet } from "../hooks/useGetTweet";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useGetOthersUser();
  const { tweets, setTweets } = useGetTweet();

  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="w-[95%] mx-auto flex justify-between">
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  );
};

export default Home;
