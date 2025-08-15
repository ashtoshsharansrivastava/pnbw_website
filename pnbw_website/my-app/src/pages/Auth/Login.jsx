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
  const [role, setRole] = useState('customer');    // 'admin', 'agent', 'customer'
  const [error, setError] = useState(null);

  // Hardcoded admin credentials
  const adminPhone = '8005431236';
  const adminEmail = 'ashutoshsharansrivastava@gmail.com';

  const handleSendOtp = async () => {
    setError(null);
    try {
      let currentRole = role;
      if (phone === adminPhone) {
        currentRole = 'admin';
        setRole('admin'); // Update state to reflect admin role
      }
      
      // TODO: call your API to send OTP to `phone` with the `currentRole`
      // Example: await yourApi.sendOtp({ phone, role: currentRole });
      setStep('enterOtp');
    } catch {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    setError(null);
    try {
      let currentRole = role;
      if (phone === adminPhone) {
        currentRole = 'admin';
      }

      await login({ phone, otp, role: currentRole });
      navigate('/', { replace: true });
    } catch {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleEmailLogin = async () => {
    setError(null);
    try {
      let currentRole = role;
      if (email === adminEmail) {
        currentRole = 'admin';
        setRole('admin'); // Update state to reflect admin role
      }

      await login({ email, role: currentRole });
      navigate('/', { replace: true });
    } catch {
      setError('Email login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm mx-auto p-8 space-y-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        {/* Page title */}
        <h1 className="text-center text-4xl font-extrabold text-gray-800">
          Welcome Back
        </h1>

        {/* Role Selection Dropdown */}
        <div className="flex justify-center">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-5 py-3 bg-gray-100 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 cursor-pointer"
          >
            <option value="customer">Customer</option>
            <option value="agent">Agent</option>
            {/* The admin option is visible but will only work with the predefined credentials */}
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 justify-center border-b border-gray-300 pb-3 text-gray-700">
          <button
            onClick={() => {
              setTab('phone');
              setStep('enterPhone');
              setError(null);
            }}
            className={`flex-1 text-center py-2 text-xl font-medium rounded-t-lg transition-colors duration-200 ${
              tab === 'phone'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
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
            className={`flex-1 text-center py-2 text-xl font-medium rounded-t-lg transition-colors duration-200 ${
              tab === 'email'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
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
                  className="w-full px-5 py-3 bg-gray-100 text-gray-800 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                />
                <button
                  onClick={handleSendOtp}
                  disabled={!phone}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
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
                  className="w-full px-5 py-3 bg-gray-100 text-gray-800 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                />
                <button
                  onClick={handleVerifyOtp}
                  disabled={!otp}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
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
              className="w-full px-5 py-3 bg-gray-100 text-gray-800 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
            />
            <button
              onClick={handleEmailLogin}
              disabled={!email}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Send Magic Link
            </button>
          </>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-500 font-medium bg-red-100 p-3 rounded-lg border border-red-200">
            {error}
          </p>
        )}

        {/* Sign Up Link */}
        <p className="text-center text-base text-gray-600">
          New user?{' '}
          <Link to="/signup" className="underline font-semibold text-indigo-600 hover:text-indigo-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}