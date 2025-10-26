import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router-dom";
import { useGetOthersUser } from "../hooks/useOthersUser";
import { useGetTweet } from "../hooks/useGetTweet";

const Home = () => {
  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useGetOthersUser();
  const { tweets, setTweets } = useGetTweet();
  console.log("Users:", users);

  return (
    <div className="w-[95%] mx-auto flex justify-between">
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  );
};

export default Home;
