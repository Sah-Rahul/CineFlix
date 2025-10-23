import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";

const Feed = () => {
  return (
    <div className="  w-full">
      <CreatePost />
      <Tweet /> <Tweet /> <Tweet /> <Tweet /> <Tweet /> <Tweet /> <Tweet />{" "}
      <Tweet /> <Tweet /> <Tweet />
    </div>
  );
};

export default Feed;
