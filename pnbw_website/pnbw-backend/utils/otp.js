const otpStore = new Map();              // phone -> { code, expires }

export const generateOtp = (phone) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  otpStore.set(phone, { code, expires: Date.now() + 5 * 60 * 1000 });
  console.log(`📨 OTP for ${phone}: ${code}`);   // replace with SMS gateway
  return code;
};

export const verifyOtp = (phone, code) => {
  const record = otpStore.get(phone);
  if (!record) return false;
  const valid = record.code === code && record.expires > Date.now();
  if (valid) otpStore.delete(phone);
  return valid;
};
