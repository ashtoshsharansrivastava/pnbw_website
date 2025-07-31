import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { generateOtp, verifyOtp } from "../utils/otp.js";

dotenv.config();

/* ---------- Helpers ---------- */
const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

/* ---------- Phone OTP flow ---------- */
export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone required" });
  generateOtp(phone);
  res.json({ message: "OTP sent" });
};

export const verifyOtpAndLogin = async (req, res) => {
  const { phone, otp } = req.body;
  if (!verifyOtp(phone, otp))
    return res.status(400).json({ message: "Invalid OTP" });

  let user = await User.findOne({ phone });
  if (!user) user = await User.create({ name: "New User", phone });

  res.json({
    token: genToken(user._id),
    user
  });
};

/* ---------- Email / password signup ---------- */
export const signup = async (req, res) => {
  const { name, email, phone, applyBroker, ref } = req.body;

  const exists =
    (email && (await User.findOne({ email }))) ||
    (phone && (await User.findOne({ phone })));

  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({
    name,
    email,
    phone,
    isBroker: !!applyBroker,
    referralCode: ref || undefined
  });

  res.status(201).json({
    token: genToken(user._id),
    user
  });
};
