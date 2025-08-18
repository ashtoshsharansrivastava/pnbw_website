import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';

// --- Helper component for icons to keep the main component cleaner ---
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

export default function Login() {
  // --- All your existing state and logic remains unchanged ---
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [tab, setTab] = useState('email');         // 'phone' or 'email', default to email
  const [step, setStep] = useState('enterPhone');  // for phone flow
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer');    // 'admin', 'agent', 'customer'
  const [error, setError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const adminPhone = '8005431236';
  const adminEmail = 'ashutoshsharansrivastava@gmail.com';

  const validatePhone = (number) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(number)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      return false;
    }
    setPhoneError(null);
    return true;
  };

  const validateEmail = (emailAddress) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(emailAddress)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (phoneError || value.length === 10) {
      validatePhone(value);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError || value.includes('@')) {
      validateEmail(value);
    }
  };

  const handleSendOtp = async () => {
    setError(null);
    if (!validatePhone(phone)) return;
    try {
      let currentRole = role;
      if (phone === adminPhone) {
        currentRole = 'admin';
        setRole('admin');
      }
      console.log(`Sending OTP to ${phone} with role ${currentRole}`);
      setStep('enterOtp');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      console.error('Send OTP error:', err);
    }
  };

  const handleVerifyOtp = async () => {
    setError(null);
    if (!validatePhone(phone)) return;
    try {
      let currentRole = role;
      if (phone === adminPhone) {
        currentRole = 'admin';
      }
      await login({ phone, otp, role: currentRole });
      navigate('/', { replace: true });
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      console.error('Verify OTP error:', err);
    }
  };

  const handleEmailLogin = async () => {
    setError(null);
    if (!validateEmail(email)) return;
    try {
      let currentRole = role;
      if (email === adminEmail) {
        currentRole = 'admin';
        setRole('admin');
      }
      await login({ email, role: currentRole });
      navigate('/', { replace: true });
    } catch (err) {
      setError('Email login failed. Please try again.');
      console.error('Email login error:', err);
    }
  };

  const isPhoneValid = phone.length > 0 && !phoneError;
  const isEmailValid = email.length > 0 && !emailError;
  // --- End of unchanged logic ---


  // --- Redesigned UI starts here ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome Back
          </h1>
          <p className="text-slate-500">
            Access your real estate dashboard.
          </p>
        </div>

        {/* Role Selector */}
        <div>
          <label className="text-sm font-medium text-slate-600 mb-2 block">I am a:</label>
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-100 p-1">
            {['customer', 'agent', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  role === r
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'bg-transparent text-slate-500 hover:bg-slate-200'
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs for Phone/Email */}
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => { setTab('email'); setError(null); }}
            className={`w-full py-2 rounded-md font-semibold text-sm transition-colors ${
              tab === 'email' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => { setTab('phone'); setStep('enterPhone'); setError(null); }}
            className={`w-full py-2 rounded-md font-semibold text-sm transition-colors ${
              tab === 'phone' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Phone
          </button>
        </div>

        {/* Form Content */}
        <div className="space-y-4">
          {/* Email Flow */}
          {tab === 'email' && (
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Icon path="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.9-3.563A3.75 3.75 0 1112 15.563a3.75 3.75 0 01-1.15-2.813z" className="w-5 h-5 text-slate-400"/>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => validateEmail(email)}
                  placeholder="example@domain.com"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-800 rounded-lg placeholder-slate-400 border transition-colors ${
                    emailError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                  } focus:outline-none focus:ring-2`}
                />
              </div>
              {emailError && <p className="text-red-600 text-xs font-medium">{emailError}</p>}
              <button
                onClick={handleEmailLogin}
                disabled={!isEmailValid}
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Send Magic Link
              </button>
            </div>
          )}

          {/* Phone Flow */}
          {tab === 'phone' && (
            <>
              {step === 'enterPhone' ? (
                <div className="space-y-4">
                  <div className="relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon path="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" className="w-5 h-5 text-slate-400"/>
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      onBlur={() => validatePhone(phone)}
                      placeholder="10-digit phone number"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-800 rounded-lg placeholder-slate-400 border transition-colors ${
                        phoneError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                      } focus:outline-none focus:ring-2`}
                    />
                  </div>
                  {phoneError && <p className="text-red-600 text-xs font-medium">{phoneError}</p>}
                  <button
                    onClick={handleSendOtp}
                    disabled={!isPhoneValid}
                    className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Send OTP
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon path="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" className="w-5 h-5 text-slate-400"/>
                    </span>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-800 rounded-lg placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleVerifyOtp}
                    disabled={!otp}
                    className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Verify & Continue
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-600 font-medium bg-red-50 p-3 rounded-lg border border-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Footer Links */}
        <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-100">
          <Link to="/forgot-password" className="font-medium text-blue-700 hover:text-blue-600 transition-colors">
            Forgot Password?
          </Link>
          <span className="mx-2">·</span>
          <span>
            New user?{' '}
            <Link to="/signup" className="font-medium text-blue-700 hover:text-blue-600 transition-colors">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}