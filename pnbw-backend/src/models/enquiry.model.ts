import { Schema, model, Document, Types } from "mongoose";

export interface IEnquiry extends Document {
  user: Types.ObjectId;
  property: Types.ObjectId;
  message: string;
  createdAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    message: { type: String, default: "" }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model<IEnquiry>("Enquiry", enquirySchema);
