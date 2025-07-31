import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: String,
  caption: String
});

const quickFactSchema = new mongoose.Schema({
  label: String
});

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    city:  { type: String, required: true },
    address: String,
    price: { type: String, required: true },                // e.g. “₹60 Lakh”
    status: { type: String, default: "Available" },
    brokerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    images: [imageSchema],
    quickFacts: [quickFactSchema],
    location: {
      lat: Number,
      lng: Number
    },
    reviews: [
      {
        name: String,
        rating: Number,
        text: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
