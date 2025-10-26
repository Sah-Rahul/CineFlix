import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slice/userSlice"
import tweetReducer from "./slice/tweetSlice"

export const store = configureStore({
    reducer:{
        user: userReducer,
        tweet: tweetReducer
    }
})