import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa";

const CreatePost = () => {
  const [text, setText] = useState("");

  const handlePost = () => {
    if (!text.trim()) return;
    console.log("Posted:", text);
    setText("");
  };

  return (
    <div className="border w-100vw border-gray-200  p-4">
      <div className="max-w-2xl   mx-auto">
        <div className="flex border-b border-gray-200 mb-3">
          <button className="flex-1 text-center py-2 font-semibold text-blue-500 border-b-2 border-blue-500">
            For you
          </button>
          <button className="flex-1 text-center py-2 text-gray-500 hover:text-blue-500 transition">
            Following
          </button>
        </div>

        <div className="flex space-x-3">
          <img
            src="https://imgs.search.brave.com/95n4UMmsoiDlLaBIZ-TbsVepS4B6OHl3M55GbwT0GEs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC83Lzgv/Yy8xMjMyNDQxLTM4/NDB4MjE2MC1kZXNr/dG9wLTRrLWdvdGhp/Yy1hbmltZS13YWxs/cGFwZXIuanBn"
            alt="user avatar"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex flex-col flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What is happening?!"
              rows="2"
              className="w-full resize-none outline-none text-gray-800 placeholder-gray-500 bg-transparent border-none focus:ring-0"
            />

            <div className="flex items-center justify-between mt-2">
              <button className="text-blue-500 text-xl hover:bg-blue-100 p-2 rounded-full transition">
                <FaRegImage />
              </button>

              <button
                onClick={handlePost}
                className="bg-blue-500 cursor-pointer text-white font-semibold px-4 py-1.5 rounded-full hover:bg-blue-600 transition disabled:opacity-50"
                disabled={!text.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;