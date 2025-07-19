// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [tab, setTab] = useState('phone');         // 'phone' or 'email'
  const [step, setStep] = useState('enterPhone');  // for phone flow
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSendOtp = async () => {
    setError(null);
    try {
      // TODO: call your API to send OTP to `phone`
      setStep('enterOtp');
    } catch {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    setError(null);
    try {
      await login({ phone, otp });
      navigate('/', { replace: true });
    } catch {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleEmailLogin = async () => {
    setError(null);
    try {
      await login({ email });
      navigate('/', { replace: true });
    } catch {
      setError('Email login failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#0F172A' }}
    >
      <div className="w-full max-w-sm p-6 space-y-6 rounded-xl bg-black/60 backdrop-blur-sm">
        <h1 className="text-center text-3xl font-bold text-white">
          Welcome Back
        </h1>

        {/* Tabs */}
        <div className="flex gap-6 justify-center border-b border-gray-700 pb-2">
          <button
            onClick={() => {
              setTab('phone');
              setStep('enterPhone');
              setError(null);
            }}
            className={`pb-1 text-lg ${
              tab === 'phone'
                ? 'border-b-2 border-accent text-accent'
                : 'text-gray-400 hover:text-accent'
            }`}
          >
            Phone
          </button>
          <button
            onClick={() => {
              setTab('email');
              setError(null);
            }}
            className={`pb-1 text-lg ${
              tab === 'email'
                ? 'border-b-2 border-accent text-accent'
                : 'text-gray-400 hover:text-accent'
            }`}
          >
            Email
          </button>
        </div>

        {/* Phone Flow */}
        {tab === 'phone' && (
          <>
            {step === 'enterPhone' ? (
              <>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  onClick={handleSendOtp}
                  disabled={!phone}
                  className="w-full py-3 bg-accent text-white rounded-lg font-semibold disabled:opacity-50 transition"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  onClick={handleVerifyOtp}
                  disabled={!otp}
                  className="w-full py-3 bg-accent text-white rounded-lg font-semibold disabled:opacity-50 transition"
                >
                  Verify & Continue
                </button>
              </>
            )}
          </>
        )}

        {/* Email Flow */}
        {tab === 'email' && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={handleEmailLogin}
              disabled={!email}
              className="w-full py-3 bg-accent text-white rounded-lg font-semibold disabled:opacity-50 transition"
            >
              Send Magic Link
            </button>
          </>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-400 font-medium">{error}</p>
        )}

        {/* Sign up link */}
        <p className="text-center text-gray-400 text-sm">
          New user?{' '}
          <Link to="/signup" className="underline text-accent">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
