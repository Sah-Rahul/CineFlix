import React from "react";
import { FaSearch } from "react-icons/fa";
import { useGetOthersUser } from "../hooks/useOthersUser";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  const { users, loading, error } = useGetOthersUser();

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="flex w-[45%] flex-col justify-between h-screen p-4 border-l border-gray-200 sticky top-0">
      <div className="flex flex-col space-y-6">
        {/* Search Bar */}
        <div className="bg-gray-300 rounded-full px-4 relative py-2 flex items-center space-x-2">
          <FaSearch className="text-gray-500 absolute right-2 text-sm cursor-pointer" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-black placeholder-gray-500"
          />
        </div>

        {/* Who to Follow Section */}
        <div className="bg-gray-100 rounded-2xl p-4">
          <h2 className="text-lg font-bold text-black mb-3">Who to follow</h2>

          <div className="space-y-3">
            {users?.length > 0 ? (
              users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between hover:bg-gray-200 p-2 rounded-lg cursor-pointer transition"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        user.profilePic ||
                        `https://ui-avatars.com/api/?name=${user.fullname}&background=random`
                      }
                      alt={user.fullname}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-black text-sm">
                        {user.fullname}
                      </h3>
                      <p className="text-gray-500 text-xs">@{user.username}</p>
                    </div>
                  </div>
                  <Link to={`/profile/${user._id}`}>
                    <button className="cursor-pointer bg-black text-white px-4 py-1 rounded-full font-semibold text-sm hover:opacity-90 transition">
                      Profile
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No users found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
