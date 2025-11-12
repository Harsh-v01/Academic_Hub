import mongoose from "mongoose";

// 🔥 Hardcoded MongoDB connection string for local testing
const MONGODB_URI = "mongodb://127.0.0.1:27017/academic_hub"; 
// ✅ Note: use 127.0.0.1 instead of localhost for stability on Windows

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("✅ MongoDB Connected Successfully");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
