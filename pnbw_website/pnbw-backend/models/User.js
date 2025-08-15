import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    password: String,                 // only used for email login
    isBroker: { type: Boolean, default: false },
    referralCode: String,
    
    // 👇 ADDED fields for role-based login and OTP/magic link auth
    role: {
      type: String,
      enum: ['admin', 'agent', 'customer'],
      default: 'customer',
      required: true,
    },
    otp: String,
    otpExpires: Date,
    magicLinkToken: String,
    magicLinkTokenExpires: Date,
    // 👆 ADDED fields
  },
  { timestamps: true }
);

/* Password helpers (for email auth) */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

export default mongoose.model("User", userSchema);