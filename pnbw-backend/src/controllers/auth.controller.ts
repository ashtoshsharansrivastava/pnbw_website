import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { generateOtp } from "../utils/genOtp";

const OTP_EXPIRY_MINUTES = 5;

export const requestOtp = async (req: Request, res: Response) => {
  const { phone, email } = req.body;
  if (!phone && !email) {
    return res.status(400).json({ message: "Please provide phone or email." });
  }

  // 1) Generate plain OTP
  const plainOtp = generateOtp();
  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(plainOtp, salt);

  // 2) Find or create user
  let user = await User.findOne(phone ? { phone } : { email });
  if (!user) {
    user = new User({ phone, email });
  }
  // 3) Save OTP hash and expiry
  user.otpCode = hashedOtp;
  user.otpExpires = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000);
  await user.save();

  // 4) “Send” OTP (simulate by console.log)
  if (phone) {
    console.log(`📲 Sending OTP ${plainOtp} to phone ${phone}`);
  } else {
    console.log(`📧 Sending OTP ${plainOtp} to email ${email}`);
  }

  return res.json({ message: "OTP sent (simulated)." });
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { phone, email, otp } = req.body;
  if (!otp || (!phone && !email)) {
    return res.status(400).json({ message: "Missing fields." });
  }

  // 1) Find user
  const user = await User.findOne(phone ? { phone } : { email });
  if (!user || !user.otpCode || !user.otpExpires) {
    return res.status(400).json({ message: "OTP not requested." });
  }

  // 2) Check expiry
  if (user.otpExpires < new Date()) {
    return res.status(400).json({ message: "OTP expired." });
  }

  // 3) Compare hashes
  const isMatch = await bcrypt.compare(otp, user.otpCode);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  // 4) Clear OTP fields and upsert user
  user.otpCode = undefined;
  user.otpExpires = undefined;
  await user.save();

  // 5) Issue JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

  return res.json({
    token,
    user: {
      id: user._id,
      phone: user.phone,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
};
