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
      ...(name === 'applyBroker' && !checked ? { referralCode: '' } : {}),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Signing up:', form)
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-skin-base flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-skin-surface rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-skin-accent text-skin-onaccent text-center py-4">
          <h1 className="text-2xl font-bold">Create Account</h1>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-4">
          <label className="block">
            <span className="text-skin-base">Full Name</span>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              className="mt-1 block w-full px-4 py-2 bg-skin-input rounded-md border border-skin-base focus:ring-skin-accent focus:border-skin-accent focus:bg-skin-input focus:text-skin-input transition"
              required
            />
          </label>

          <label className="block">
            <span className="text-skin-base">Email Address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2 bg-skin-input rounded-md border border-skin-base focus:ring-skin-accent focus:border-skin-accent focus:bg-skin-input focus:text-skin-input transition"
              required
            />
          </label>

          <label className="block">
            <span className="text-skin-base">Phone Number</span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 555 123 4567"
              className="mt-1 block w-full px-4 py-2 bg-skin-input rounded-md border border-skin-base focus:ring-skin-accent focus:border-skin-accent focus:bg-skin-input focus:text-skin-input transition"
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
              className="h-5 w-5 text-skin-accent border-skin-base rounded focus:ring-skin-accent"
            />
            <span className="text-skin-base">Apply to become a broker</span>
          </label>

          {/* Referral Code: only show when applyBroker is checked */}
          {form.applyBroker && (
            <label className="block">
              <span className="text-skin-base">Referral Code</span>
              <input
                type="text"
                name="referralCode"
                value={form.referralCode}
                onChange={handleChange}
                placeholder="Enter referral code"
                className="mt-1 block w-full px-4 py-2 bg-skin-input rounded-md border border-skin-base focus:ring-skin-accent focus:border-skin-accent focus:bg-skin-input focus:text-skin-input transition"
              />
            </label>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-skin-accent hover:bg-skin-accent-hover text-skin-onaccent font-semibold rounded-md transition"
          >
            Sign Up
          </button>
        </div>

        {/* Footer */}
        <div className="bg-skin-surface-muted text-center py-4">
          <p className="text-sm text-skin-muted">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-skin-accent hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
