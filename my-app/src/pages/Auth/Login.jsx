// src/pages/Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [mode, setMode] = useState('phone') // or 'email'
  const [identifier, setIdentifier] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: trigger send OTP / login request
    console.log(`Logging in via ${mode}:`, identifier)
    navigate('/') // after success
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white text-center py-4">
          <h1 className="text-xl font-bold">Welcome Back</h1>
        </div>

        {/* Toggle */}
        <div className="flex">
          <button
            type="button"
            onClick={() => setMode('phone')}
            className={`flex-1 py-2 text-center ${
              mode === 'phone'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Phone
          </button>
          <button
            type="button"
            onClick={() => setMode('email')}
            className={`flex-1 py-2 text-center ${
              mode === 'email'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Email
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <label className="block">
            <span className="text-gray-700">
              {mode === 'phone' ? 'Phone Number' : 'Email Address'}
            </span>
            <input
              type={mode === 'phone' ? 'tel' : 'email'}
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              placeholder={
                mode === 'phone' ? 'e.g. +1 555 123 4567' : 'you@example.com'
              }
              className="mt-1 block w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Send OTP
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center py-4">
          <p className="text-sm">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
