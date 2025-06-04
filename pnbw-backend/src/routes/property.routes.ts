import { Router } from "express";
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// PUBLIC
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

// PROTECTED (admin or broker: you can add additional role checks)
router.post("/", protect, createProperty);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);

export default router;
