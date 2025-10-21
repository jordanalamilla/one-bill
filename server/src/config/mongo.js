/**
 * MongoDB Configuration.
 * 
 * Functionality to connect to the Mongo database with Mongoose.
 */

import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

// Connect to the database with Mongoose.
export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}