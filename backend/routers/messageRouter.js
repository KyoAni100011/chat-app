import express from "express";
import {
  getMessageByUserId,
  sendMessage,
} from "../controllers/messageController.js";
const router = express.Router();

router.post("/send-message", sendMessage);
router.get("/get-message", getMessageByUserId);

export default router;
