import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";

const Feed = () => {
  return (
    <div className="flex-1 border-x border-gray-200 min-h-screen bg-white">
      <CreatePost />
      <Tweet />
       <Tweet />
        <Tweet /> <Tweet /> <Tweet /> <Tweet /> <Tweet /> <Tweet /> <Tweet /> <Tweet />
    </div>
  );
};

export default Feed;
