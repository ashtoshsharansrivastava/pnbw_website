import { Router } from "express";
import {
  createEnquiry,
  getAllEnquiries,
} from "../controllers/enquiry.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// POST /api/v1/enquiries  (protected: must have a valid token)
router.post("/", protect, createEnquiry);

// GET  /api/v1/enquiries  (protected: admin or broker)
router.get("/", protect, getAllEnquiries);

export default router;
