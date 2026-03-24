import mongoose, { Schema, Document } from "mongoose";
import { Content } from "next/font/google";
export interface Message extends Document {
  content: string;
  createAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createAt: { type: Date, required: true, default: Date.now() },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isVerifyCode: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessage: boolean;
  message: Message[];
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, "User Name required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, "Please enter valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: false,
  },
  message: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("user", UserSchema);

export default UserModel;
