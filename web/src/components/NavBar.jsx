import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { Film, HelpCircle, LogOut, Settings, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setLogout, setLoading } from "../store/slices/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.user);
  console.log(user);

  const handlelogout = async () => {
    try {
      dispatch(setLoading(true));
      await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
      dispatch(setLogout());
      toast.success("Logout successful");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to logout. Try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full   text-white z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative">
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Film
                className="w-6 h-6 md:w-7 md:h-7 text-white"
                strokeWidth={2.5}
              />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>

          <div className="flex items-center">
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
              Cine
            </span>
            <span className="text-2xl md:text-3xl font-bold text-white">
              Flix
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xl">
          {user ? (
            <>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className=" text-white text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-white border"
                />
                <FaSearch className="absolute right-2 top-2.5 text-sm text-gray-400 cursor-pointer" />
              </div>
              <div className="flex items-center justify-center">
                <img
                  onClick={() => setOpen(!open)}
                  src="https://avatar.iran.liara.run/public/boy"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                {open && (
                  <>
                    <div className="fixed top-14 right-7 w-64 bg-black/95 backdrop-blur-md border border-gray-800 rounded-lg shadow-2xl overflow-hidden z-50">
                      <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 p-4 border-b border-gray-800">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {user?.fullName?.charAt(0)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-base truncate">
                              {user.fullName}
                            </h3>
                            <p className="text-gray-400 text-xs truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <button
                          onClick={handlelogout}
                          className="cursor-pointer w-full px-4 py-3 flex items-center space-x-3 hover:bg-red-600/20 transition-colors group"
                        >
                          <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors" />
                          <span className=" text-red-500 text-sm group-hover:text-red-400 transition-colors font-medium">
                            Logout
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to={"/register"}>
                <button className="px-5 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;