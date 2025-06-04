import { Request, Response } from "express";
import Property from "../models/property.model";

// GET /api/v1/properties
export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const props = await Property.find();
    return res.json(props);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/v1/properties/:id
export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: "Property not found" });
    return res.json(prop);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/v1/properties   (Protected: only admin or broker)
export const createProperty = async (req: Request, res: Response) => {
  try {
    const { title, price, images, status, rating } = req.body;
    const newProp = new Property({ title, price, images, status, rating });
    const saved = await newProp.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ message: "Invalid data" });
  }
};

// PUT /api/v1/properties/:id   (Protected)
export const updateProperty = async (req: Request, res: Response) => {
  try {
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ message: "Invalid data" });
  }
};

// DELETE /api/v1/properties/:id   (Protected)
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "Deleted." });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
