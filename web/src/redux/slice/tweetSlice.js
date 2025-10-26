import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: null,
    refresh:false,
    followingTweet:null
  },
  reducers: {
    getAllTweets: (state, action) => {
      state.tweets = action.payload;
    },
    refreshTweets: (state) => {
      state.refresh = !state.refresh;
    },
    getFollowingTweets: (state, action) => {
      state.followingTweet = action.payload;
    },
  },
});

export const { getAllTweets, refreshTweets, getFollowingTweets} = tweetSlice.actions;

export default tweetSlice.reducer;
