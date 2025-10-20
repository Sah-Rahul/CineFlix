import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full   text-white z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Side - Logo and Menu */}
        <div className="flex items-center space-x-6">
          CineFlix
        </div>

        {/* Right Side - Icons */}
        <div className="flex items-center space-x-4 text-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <FaSearch className="absolute right-2 top-3 text-sm text-gray-400 cursor-pointer" />
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
