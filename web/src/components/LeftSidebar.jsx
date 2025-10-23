import React from "react";
import {
  FaHome,
  FaHashtag,
  FaBell,
  FaUser,
  FaBookmark,
  FaSignOutAlt,
} from "react-icons/fa";

const LeftSidebar = () => {
  return (
    <div className="flex flex-col justify-between h-screen p-4 border-r border-gray-200 sticky top-0 bg-white">
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-blue-500 mb-4 cursor-pointer">
          X
        </h1>

        <nav className="flex flex-col space-y-2">
          <SidebarItem icon={<FaHome />} label="Home" />
          <SidebarItem icon={<FaHashtag />} label="Explore" />
          <SidebarItem icon={<FaBell />} label="Notifications" />
          <SidebarItem icon={<FaUser />} label="Profile" />
          <SidebarItem icon={<FaBookmark />} label="Bookmarks" />
        </nav>

        <button className="cursor-pointer bg-blue-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-600 transition duration-200 w-fit md:w-full">
          Post
        </button>
      </div>

      <div>
        <SidebarItem icon={<FaSignOutAlt />} label="Logout" />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label }) => (
  <button
    className="
      flex items-center space-x-3 
      text-gray-800 font-medium
      hover:text-blue-500 cursor-pointer hover:bg-blue-100
      px-4 py-2 rounded-full
      transition duration-200 ease-in-out
      w-fit md:w-full
    "
  >
    <span className="text-xl">{icon}</span>
    <span className="text-lg hidden md:inline">{label}</span>
  </button>
);

export default LeftSidebar;
