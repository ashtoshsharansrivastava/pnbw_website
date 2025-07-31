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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm mx-auto p-6 space-y-6 bg-white rounded-xl shadow">
        {/* Page title */}
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Welcome Back
        </h1>

        {/* Tabs */}
        <div className="flex gap-6 justify-center border-b border-gray-200 pb-2 text-gray-700">
          <button
            onClick={() => {
              setTab('phone');
              setStep('enterPhone');
              setError(null);
            }}
            className={`pb-1 text-lg ${
              tab === 'phone'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-indigo-600'
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
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-indigo-600'
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
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <button
                  onClick={handleSendOtp}
                  disabled={!phone}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold disabled:opacity-50 transition"
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
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <button
                  onClick={handleVerifyOtp}
                  disabled={!otp}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold disabled:opacity-50 transition"
                >
                  Verify &amp; Continue
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
              className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <button
              onClick={handleEmailLogin}
              disabled={!email}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold disabled:opacity-50 transition"
            >
              Send Magic Link
            </button>
          </>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-700">
          New user?{' '}
          <Link to="/signup" className="underline text-indigo-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
