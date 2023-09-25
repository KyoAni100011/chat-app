import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageModel = new Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    chatId: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

export const Message = mongoose.model("Message", messageModel);
