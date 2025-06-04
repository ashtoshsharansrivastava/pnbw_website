import { Schema, model, Document } from "mongoose";

export interface IProperty extends Document {
  title: string;
  price: number;
  images: string[];   // array of image URLs or file paths
  status: "Ready to Move" | "Under Construction" | "Resale";
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ["Ready to Move", "Under Construction", "Resale"],
      required: true
    },
    rating: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default model<IProperty>("Property", propertySchema);
