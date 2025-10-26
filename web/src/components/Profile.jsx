import React, { useEffect, useState } from "react";
import { ArrowLeft, Search, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_POINT } from "../utils/constant";

const Profile = () => {
  const { id } = useParams();
  const { user: loggedInUser } = useSelector((store) => store.user);
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        if (id) {
          const { data } = await axios.get(`${USER_API_POINT}/${id}`, {
            withCredentials: true,
          });
          setProfileUser(data.user);
        } else {
          setProfileUser(loggedInUser || null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setProfileUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, loggedInUser]);

  if (loading) return <p className="text-white p-4">Loading profile...</p>;
  if (!profileUser) return <p className="text-white p-4">User not found.</p>;

  return (
    <div className="w-[95%] mx-auto min-h-screen text-white">
      <div className="flex items-center bg-gray-800 justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-8">
          <Link to={"/"}>
            <ArrowLeft className="w-5 h-5 cursor-pointer hover:bg-gray-900 rounded-full p-1 box-content" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{profileUser.fullname}</h1>
            <p className="text-sm ">2 posts</p>
          </div>
        </div>
        <Search className="w-5 h-5 cursor-pointer hover:bg-gray-900 rounded-full p-2 box-content" />
      </div>

      <div className="relative">
        <div className="h-48">
          <img
            className="h-full w-full object-cover"
            src="https://imgs.search.brave.com/xnHRw_wAEeKv6jPCvoCzCG2FDvL3ZhQjAkEexzpm07A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMud2FsbHBhcGVy/c2Rlbi5jb20vaW1h/Z2Uvd3MtaGQtdGhl/LWN1dGUtZnJpZW5k/c2hpcC1hbmltZV85/MjgzNC5qcGc"
            alt="Banner"
          />
        </div>

        <div className="absolute -bottom-16 left-4">
          <div className="w-32 h-32 rounded-full border-4 border-black overflow-hidden bg-gray-700">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {(id === loggedInUser?.user?._id || !id) && (
          <div className="absolute bg-gray-900 rounded-full bottom-4 right-4">
            <button className="px-4 py-2 border cursor-pointer border-gray-600 rounded-full font-semibold transition-colors">
              Edit profile
            </button>
          </div>
        )}
      </div>

      <div className="mt-20 px-4">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-xl text-black font-bold">
            {profileUser.fullname}
          </h2>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500 rounded-full">
            <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium">Get verified</span>
          </div>
        </div>

        <p className="text-gray-500 mb-3">@{profileUser.username}</p>
        <p className="text-gray-600 mb-2 text-sm leading-relaxed">
          Passionate MERN Stack Developer building modern web apps.
        </p>

        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            Joined{" "}
            {new Date(profileUser.createdAt).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm mb-6">
          <span className="hover:underline cursor-pointer">
            <span className="font-semibold text-white">5</span>
            <span className="text-gray-500 ml-1">Posts</span>
          </span>
          <span className="hover:underline cursor-pointer">
            <span className="text-gray-500">
              {profileUser.followers?.length || 0} Followers
            </span>
          </span>
          <span className="hover:underline cursor-pointer">
            <span className="text-gray-500">
              {profileUser.following?.length || 0} Following
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
