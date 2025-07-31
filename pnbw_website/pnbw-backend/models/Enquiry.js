import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    brokerId:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },   // filled automatically
    userId:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message:    { type: String, default: "" },
    contactSnapshot: {
      name:  String,
      phone: String,
      email: String
    },
    status: { type: String, enum: ["open", "closed"], default: "open" }
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
