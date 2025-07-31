import express from "express";
import {
  sendOtp,
  verifyOtpAndLogin,
  signup
} from "../controllers/authController.js";

const router = express.Router();

router.post("/otp/send", sendOtp);          // POST /api/auth/otp/send
router.post("/login", verifyOtpAndLogin);   // POST /api/auth/login
router.post("/signup", signup);            // POST /api/auth/signup

export default router;
