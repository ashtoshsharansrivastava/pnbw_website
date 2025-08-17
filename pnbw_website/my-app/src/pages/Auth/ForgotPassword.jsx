import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Assuming authAPI exists and has a sendPasswordResetLink method
// import * as authAPI from '../api/auth.js'; // Adjust path as needed

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Email validation regex
  const validateEmail = (emailAddress) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(emailAddress);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // TODO: Call your backend API to send the password reset link
      // await authAPI.sendPasswordResetLink(email); // Example call to your authAPI
      
      console.log(`Password reset link requested for: ${email}`);
      setSuccess('If an account with that email exists, a password reset link has been sent to your inbox.');
      
      setTimeout(() => {
        navigate('/login'); // Redirect to login after a few seconds
      }, 5000);

    } catch (err) {
      setError('Failed to send password reset link. Please try again.');
      console.error('Forgot password error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm mx-auto p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-center text-3xl font-extrabold text-gray-800">
          Forgot Password
        </h1>
        
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-center text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => { // Validate on blur
                if (!validateEmail(e.target.value)) {
                  setError('Please enter a valid email address.');
                } else {
                  setError(null);
                }
              }}
              placeholder="Your Email Address"
              required
              // Added text-gray-800 to ensure typed text is black
              className={`w-full px-5 py-3 bg-gray-100 text-gray-800 rounded-xl focus:outline-none focus:ring-2 ${
                error && !validateEmail(email) ? 'focus:ring-red-500 border-red-500' : 'focus:ring-indigo-500'
              }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button
              type="submit"
              disabled={!email || !validateEmail(email)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <p className="text-center text-green-600 font-medium bg-green-100 p-3 rounded-lg border border-green-200">
            {success}
          </p>
        )}
        
        <p className="text-center text-base text-gray-600">
          Remember your password?{' '}
          <Link to="/login" className="underline font-semibold text-indigo-600 hover:text-indigo-800">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
