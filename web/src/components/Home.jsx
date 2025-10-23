import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-[95%] mx-auto flex justify-between">
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  );
};

export default Home;
