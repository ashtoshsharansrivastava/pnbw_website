import { Router } from "express";
import { requestOtp, verifyOtp } from "../controllers/auth.controller";

const router = Router();

// POST /api/v1/auth/request-otp
router.post("/request-otp", requestOtp);

// POST /api/v1/auth/verify-otp
router.post("/verify-otp", verifyOtp);

export default router;
