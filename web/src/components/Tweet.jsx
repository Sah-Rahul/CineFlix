import React from "react";
import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";

const Tweet = () => {
  return (
    <div className="  mx-auto bg-white   p-4 my-4 border-t-1 border-gray-200 dark:border-gray-200 transition">
      <div className="flex items-center text-black space-x-3">
        <img
          src="https://imgs.search.brave.com/VAWLpqOIM1TGZM0-JRDBW-vPwRyJu4mctHh5wQj0cq8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFrcmI1STVJNUwu/cG5n"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold text-black   text-sm sm:text-base">
            Rahul
          </h2>
          <p className="text-black  text-xs sm:text-sm">@rahulsah</p>
        </div>
      </div>

      <p className="text-black   text-sm sm:text-base mt-3">
        Hello developers, let's connect and grow together.
      </p>

      <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm mt-4">
        <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
          <FaRegComment />
          <span>0</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer hover:text-pink-500">
          <FaRegHeart />
          <span>0</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer hover:text-green-500">
          <FaRegBookmark />
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
