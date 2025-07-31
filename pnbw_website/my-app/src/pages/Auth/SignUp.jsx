// src/pages/Auth/SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    applyBroker: false,
    referralCode: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'applyBroker' && !checked ? { referralCode: '' } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signing up:', form);
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-indigo-600 text-white text-center py-4">
          <h1 className="text-2xl font-bold">Create Account</h1>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-4">
          <label className="block">
            <span className="text-gray-700">Full Name</span>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 transition"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Email Address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 transition"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Phone Number</span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 555 123 4567"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 transition"
            />
          </label>

          {/* Broker Checkbox */}
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              name="applyBroker"
              checked={form.applyBroker}
              onChange={handleChange}
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-200"
            />
            <span className="text-gray-700">Apply to become a broker</span>
          </label>

          {/* Referral Code: only show when applyBroker is checked */}
          {form.applyBroker && (
            <label className="block">
              <span className="text-gray-700">Referral Code</span>
              <input
                type="text"
                name="referralCode"
                value={form.referralCode}
                onChange={handleChange}
                placeholder="Enter referral code"
                className="mt-1 block w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 transition"
              />
            </label>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
          >
            Sign Up
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center py-4">
          <p className="text-sm text-gray-700">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
