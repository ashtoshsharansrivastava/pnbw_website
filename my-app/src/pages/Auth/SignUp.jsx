// src/pages/SignUp.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    applyBroker: false,
    referralCode: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
      // if unchecking broker, clear the referralCode
      ...(name === 'applyBroker' && !checked ? { referralCode: '' } : {}),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: send `form` to your signup API
    console.log('Signing up:', form)
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-4">
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
              className="mt-1 block w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition"
              required
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
              className="mt-1 block w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition"
              required
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
              className="mt-1 block w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition"
              required
            />
          </label>

          {/* Broker Checkbox */}
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              name="applyBroker"
              checked={form.applyBroker}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
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
                className="mt-1 block w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition"
              />
            </label>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Sign Up
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center py-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
