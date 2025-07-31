import express from "express";
import { createEnquiry } from "../controllers/enquiryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* Anyone logged-in can send an enquiry */
router.post("/", protect, createEnquiry);

export default router;
