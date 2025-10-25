import express from "express"
import { followUser, getMyProfile, getOthersUsers, login, logout, register, unFollowUser } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middleware/middleware.js"

const userRouter = express.Router()


userRouter.post('/register', register)

userRouter.post('/login', login)

userRouter.get('/logout', logout)

userRouter.get('/my-profile', isAuthenticated, getMyProfile)

userRouter.get('/get-other-user', isAuthenticated, getOthersUsers)

userRouter.put("/follow/:id", isAuthenticated, followUser);  

userRouter.put("/unfollow/:id", isAuthenticated, unFollowUser);

export default userRouter