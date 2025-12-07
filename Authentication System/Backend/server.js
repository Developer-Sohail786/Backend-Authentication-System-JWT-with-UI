// Milestone 1

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js"

dotenv.config(); //loads env files and allows safe use process.env.VARIABLE

const app = express();

// middlewares
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend origin
    credentials: true, // allow cookies to be sent
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

console.log("MONGO_URL:", process.env.MONGO_URL);

// Database connection
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("Mongo Db connected"))
  .catch((err) => console.log("Mongo Db not connected", err));

// Test route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Milestone 1 completed

// Milestone 2
