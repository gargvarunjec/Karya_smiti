import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true
  },
  email: {
    type: String,
    requried: true,
    unique: true,
  },
  password: {
    type: String,
    requried: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("Users", userSchema);
