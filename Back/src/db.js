import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(">>> DB is connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};
