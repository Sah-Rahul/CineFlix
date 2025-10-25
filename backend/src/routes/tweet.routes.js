import express from "express";
import { isAuthenticated } from "../middleware/middleware.js";
import { bookmarkTweet, createTweet, deleteTweet, dislikeTweet,  getAllTweetsFeed, getFollowingTweets, likeTweet } from "../controllers/tweet.controller.js";
 
const tweetRouter = express.Router();

tweetRouter.post("/create-tweet", isAuthenticated, createTweet);

tweetRouter.delete("/delete-tweet/:id", isAuthenticated, deleteTweet);

tweetRouter.put("/like/:id", isAuthenticated, likeTweet);

tweetRouter.put("/dislike/:id", isAuthenticated, dislikeTweet);

tweetRouter.put("/bookmark/:id", isAuthenticated, bookmarkTweet);  

tweetRouter.get("/get-all-tweet", isAuthenticated, getAllTweetsFeed);  

tweetRouter.get("/following-tweet", isAuthenticated, getFollowingTweets); 

export default tweetRouter;
