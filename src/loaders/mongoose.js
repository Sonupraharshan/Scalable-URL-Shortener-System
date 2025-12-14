import mongoose from "mongoose";
import dbConfig from "../config/db.js";

export default async function mongooseLoader() {
    try {
        await mongoose.connect(dbConfig.uri, dbConfig.options);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
}
