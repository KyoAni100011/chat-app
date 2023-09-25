import express from "express";
import { Login, Register, setAvatar } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.put("/set-avatar", setAvatar);

export default router;
