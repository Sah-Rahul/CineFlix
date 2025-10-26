import axios from "axios";
import React from "react";
import {
  FaHome,
  FaHashtag,
  FaBell,
  FaUser,
  FaBookmark,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { USER_API_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getOtherUsers, getUser } from "../redux/slice/userSlice";
import { getAllTweets } from "../redux/slice/tweetSlice";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${USER_API_POINT}/logout`, {
        withCredentials: true,
      });
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getAllTweets(null));

      navigate("/login");
      toast.success("Logout successfull");
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  return (
    <>
      <div className="flex flex-col justify-between h-screen p-4 border-r border-gray-200 sticky top-0 bg-white">
        <div className="flex flex-col space-y-6">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-500 mb-4 cursor-pointer"
          >
            EchoX
          </Link>

          <nav className="flex flex-col space-y-2">
            <SidebarItem icon={<FaHome />} label="Home" to="/" />
            <SidebarItem icon={<FaHashtag />} label="Explore" to="/explore" />
            <SidebarItem
              icon={<FaBell />}
              label="Notifications"
              to="/notifications"
            />
            <SidebarItem icon={<FaUser />} label="Profile" to="/profile" />
            <SidebarItem
              icon={<FaBookmark />}
              label="Bookmarks"
              to="/bookmarks"
            />
          </nav>

          <button className="cursor-pointer bg-blue-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-600 transition duration-200 w-fit md:w-full">
            Post
          </button>
        </div>
        <button
          onClick={logoutHandler}
          className="flex gap-2 cursor-pointer items-center"
        >
          <FaSignOutAlt className="text-2xl" />
          Logout
        </button>
      </div>
    </>
  );
};

const SidebarItem = ({ icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        flex items-center space-x-3 
        cursor-pointer px-4 py-2 rounded-full transition duration-200 ease-in-out w-fit md:w-full
        ${
          isActive
            ? "text-blue-500 "
            : "text-gray-800 hover:text-blue-500 hover:bg-blue-100"
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-lg hidden md:inline">{label}</span>
    </Link>
  );
};

export default LeftSidebar;
