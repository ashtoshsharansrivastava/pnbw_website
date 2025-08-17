import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// The path '../../store/useAuthStore.js' is typically correct if Login.jsx is in 'src/pages/Auth/'
// and useAuthStore.js is in 'src/store/'. This path implies navigating up two directories.
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
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  // Hardcoded admin credentials
  const adminPhone = '8005431236';
  const adminEmail = 'ashutoshsharansrivastava@gmail.com';

  // Phone number validation regex: 10 digits
  const validatePhone = (number) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(number)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      return false;
    }
    setPhoneError(null);
    return true;
  };

  // Email validation regex: basic format (e.g., user@domain.com)
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
    // Validate only if there's an existing error or if the user has typed enough
    if (phoneError || value.length === 10) {
      validatePhone(value);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Validate only if there's an existing error or if the user has typed enough
    if (emailError || value.includes('@')) { // Basic trigger for email validation
      validateEmail(value);
    }
  };

  const handleSendOtp = async () => {
    setError(null);
    if (!validatePhone(phone)) {
      return; // Stop if phone number is invalid
    }

    try {
      let currentRole = role;
      if (phone === adminPhone) {
        currentRole = 'admin';
        setRole('admin'); // Update state to reflect admin role
      }
      
      // TODO: call your API to send OTP to `phone` with the `currentRole`
      // Example: await authAPI.sendOtp({ phone, role: currentRole }); // Assuming authAPI has this method
      console.log(`Sending OTP to ${phone} with role ${currentRole}`);
      setStep('enterOtp');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      console.error('Send OTP error:', err);
    }
  };

  const handleVerifyOtp = async () => {
    setError(null);
    if (!validatePhone(phone)) {
      return; // Should not happen if send OTP was successful, but good to double check
    }

    try {
      let currentRole = role;
      if (phone === adminPhone) {
        currentRole = 'admin';
      }

      // The useAuthStore.js already calls authAPI.login, so we don't need to call authAPI directly here
      await login({ phone, otp, role: currentRole });
      navigate('/', { replace: true });
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      console.error('Verify OTP error:', err);
    }
  };

  const handleEmailLogin = async () => {
    setError(null);
    if (!validateEmail(email)) {
      return; // Stop if email is invalid
    }

    try {
      let currentRole = role;
      if (email === adminEmail) {
        currentRole = 'admin';
        setRole('admin'); // Update state to reflect admin role
      }

      // The useAuthStore.js already calls authAPI.login, so we don't need to call authAPI directly here
      await login({ email, role: currentRole });
      navigate('/', { replace: true });
    } catch (err) {
      setError('Email login failed. Please try again.');
      console.error('Email login error:', err);
    }
  };

  const isPhoneValid = phone.length > 0 && !phoneError;
  const isEmailValid = email.length > 0 && !emailError;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-inter"> {/* Removed background class */}
      <div className="w-full max-w-md mx-auto p-8 space-y-6 bg-white rounded-xl shadow-xl border border-gray-200">
        {/* Page title */}
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Welcome Back <span role="img" aria-label="House emoji" className="text-blue-600">🏠</span>
        </h1>
        <p className="text-center text-sm sm:text-base text-gray-600 max-w-xs mx-auto">
          Access your real estate dashboard.
        </p>

        {/* Role Selection Dropdown */}
        <div className="flex justify-center mt-6">
          <div className="relative w-full">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer shadow-sm appearance-none"
            >
              <option value="customer">Customer</option>
              <option value="agent">Agent</option>
              {/* The admin option is visible but will only work with the predefined credentials */}
              <option value="admin">Admin</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-gray-200 text-gray-700 mt-4">
          <button
            onClick={() => {
              setTab('phone');
              setStep('enterPhone');
              setError(null);
              setPhoneError(null);
              setEmailError(null); // Clear email errors when switching tabs
            }}
            className={`flex-1 text-center py-2 text-base font-semibold transition-all duration-200 ease-in-out ${
              tab === 'phone'
                ? 'text-blue-700 border-b-2 border-blue-700'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Phone
          </button>
          <button
            onClick={() => {
              setTab('email');
              setError(null);
              setPhoneError(null); // Clear phone errors when switching tabs
              setEmailError(null);
            }}
            className={`flex-1 text-center py-2 text-base font-semibold transition-all duration-200 ease-in-out ${
              tab === 'email'
                ? 'text-blue-700 border-b-2 border-blue-700'
                : 'text-gray-600 hover:text-blue-600'
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
                  onChange={handlePhoneChange}
                  onBlur={() => validatePhone(phone)} // Validate on blur
                  placeholder="Phone Number (e.g., 123-456-7890)"
                  className={`w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 ${
                    phoneError ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-400'
                  } transition-all duration-200 shadow-sm`}
                />
                {phoneError && <p className="text-red-600 text-xs mt-1 font-medium">{phoneError}</p>}
                <button
                  onClick={handleSendOtp}
                  disabled={!isPhoneValid}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
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
                  className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-sm"
                />
                <button
                  onClick={handleVerifyOtp}
                  disabled={!otp}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
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
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)} // Validate on blur
              placeholder="Email Address (e.g., example@domain.com)"
              className={`w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 ${
                emailError ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-400'
              } transition-all duration-200 shadow-sm`}
            />
            {emailError && <p className="text-red-600 text-xs mt-1 font-medium">{emailError}</p>}
            <button
              onClick={handleEmailLogin}
              disabled={!isEmailValid}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              Send Magic Link
            </button>
          </>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-700 font-semibold bg-red-50 p-2 rounded-md border border-red-300 text-sm">
            {error}
          </p>
        )}

        {/* Forgot Password Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          <Link to="/forgot-password" className="underline font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
            Forgot Password?
          </Link>
        </p>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          New user?{' '}
          <Link to="/signup" className="underline font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

