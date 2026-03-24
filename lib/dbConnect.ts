import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
  console.log("Creating new cache...");
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    console.log("✅ Using existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Connecting to database...");

    cached.promise = mongoose.connect(process.env.MONGODB_URI!);
  }

  cached.conn = await cached.promise;

  console.log("🔥 Database connected successfully");

  return cached.conn;
}

export default dbConnect;