const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Send OTP (phone/email)
// Verify OTP
// Simple session or JWT issuance

router.get('/me', async (req, res) => {
  // return logged-in user
});

// ... implement send-otp-phone, send-otp-email, verify-otp

module.exports = router;
