import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  phone?: string;
  email?: string;
  role: "customer" | "broker" | "admin";
  status: "active" | "disabled";
  otpCode?: string;      // hashed OTP
  otpExpires?: Date;     // expiry timestamp
}

const userSchema = new Schema<IUser>(
  {
    phone: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ["customer", "broker", "admin"], default: "customer" },
    status: { type: String, enum: ["active", "disabled"], default: "active" },
    otpCode: { type: String },       // hashed OTP (bcrypt)
    otpExpires: { type: Date }       // 5 minutes from creation
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
