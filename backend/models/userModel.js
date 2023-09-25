import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

export const User = mongoose.model("User", userSchema);
