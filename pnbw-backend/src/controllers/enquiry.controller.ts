import { Request, Response } from "express";
import Enquiry from "../models/enquiry.model";

export const createEnquiry = async (req: Request, res: Response) => {
  const { user, property, message } = req.body;
  if (!user || !property) {
    return res.status(400).json({ message: "user and property are required." });
  }
  try {
    const newEnq = new Enquiry({ user, property, message });
    const saved = await newEnq.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ message: "Invalid data." });
  }
};

// (OPTIONAL) GET /api/v1/enquiries  → for admin/broker
export const getAllEnquiries = async (_req: Request, res: Response) => {
  try {
    const enquiries = await Enquiry.find()
      .populate("user", "phone email")
      .populate("property", "title price");
    return res.json(enquiries);
  } catch (err) {
    return res.status(500).json({ message: "Server error." });
  }
};
