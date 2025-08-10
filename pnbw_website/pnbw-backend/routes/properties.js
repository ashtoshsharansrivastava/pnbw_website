import express from "express";
import {
  listProperties,
  getProperty,
  createProperty
} from "../controllers/propertyController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// GET all properties
router.get("/", listProperties);

// GET a single property
router.get("/:id", getProperty);

// POST create a property (with image upload)
router.post("/", upload.array("images", 10), createProperty);

export default router;
