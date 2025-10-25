import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectDb from "./src/config/db.js";

// imported routes

import userRouter from "./src/routes/user.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/v1/auth", userRouter);

app.get("/", (req, res) => {
  res.send("server is running ✅ ...");
});

app.listen(port, () => {
  ConnectDb();
  console.log(`server is running on http://localhost:${port}`);
});
