import mongoose from "mongoose";

const brokerStatsSchema = new mongoose.Schema({
  brokerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  referrals:  { type: Number, default: 0 },
  code:       { type: String, default: () => Math.random().toString(36).slice(2, 8).toUpperCase() },
  profit:     { type: Number, default: 0 }   // store in INR
});

export default mongoose.model("BrokerStats", brokerStatsSchema);
