import React, { useState } from 'react';
import api from '../api';

export default function LoginModal({ user, setUser }) {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const sendOtp = async () => {
    await api.post('/auth/send-otp-phone', { phone });
    setOtpSent(true);
  };

  const verifyOtp = async () => {
    const res = await api.post('/auth/verify-otp', { phone, otp });
    setUser(res.data.user);
    setShow(false);
  };

  if (user) return null;
  return (
    <>
      <button onClick={() => setShow(true)} id="login-btn">Login</button>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Login / Sign Up</h3>
            {!otpSent ? (
              <>
                <input
                  type="text"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
                <button onClick={sendOtp}>Send OTP</button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                />
                <button onClick={verifyOtp}>Verify & Login</button>
              </>
            )}
            <button className="close-btn" onClick={() => setShow(false)}>×</button>
          </div>
        </div>
      )}
    </>
  );
}
