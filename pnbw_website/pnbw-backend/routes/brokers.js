import express from "express";
import {
  getStats,
  getListings
} from "../controllers/brokerController.js";
import { listForBroker } from "../controllers/enquiryController.js";

const router = express.Router();

router.get("/:id/stats",    getStats);
router.get("/:id/listings", getListings);
router.get("/:id/enquiries", listForBroker);

export default router;
