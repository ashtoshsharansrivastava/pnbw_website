import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const [tab, setTab] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('enterPhone');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError(null);
    try {
      // call your OTP API here
      setStep('enterOtp');
    } catch {
      setError('Failed to send OTP');
    }
  };

  const handleVerify = async () => {
    setError(null);
    try {
      await login({ phone, otp });
      navigate('/', { replace: true });
    } catch {
      setError('Invalid OTP or phone');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="mx-auto max-w-sm w-full space-y-6 bg-white p-6 rounded-xl shadow">
        <h1 className="bg-black text-white text-center text-3xl font-bold py-2 rounded">Welcome back</h1>

        <div className="flex gap-4 border-b border-gray-300 pb-2">
          <button
            onClick={() => {
              setTab('phone');
              setStep('enterPhone');
              setError(null);
            }}
            className={`pb-1 ${tab === 'phone' && 'border-b-2 border-blue-500 font-semibold'}`}
          >
            Phone
          </button>
          <button
            onClick={() => {
              setTab('email');
              setError(null);
            }}
            className={`pb-1 ${tab === 'email' && 'border-b-2 border-blue-500 font-semibold'}`}
          >
            Email
          </button>
        </div>

        {tab === 'phone' && (
          <>
            {step === 'enterPhone' ? (
              <>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full rounded bg-gray-100 px-4 py-3"
                />
                <button
                  onClick={handleSendOtp}
                  disabled={!phone}
                  className="w-full rounded bg-blue-500 text-white py-2 disabled:opacity-50"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full rounded bg-gray-100 px-4 py-3"
                />
                <button
                  onClick={handleVerify}
                  disabled={!otp}
                  className="w-full rounded bg-blue-500 text-white py-2 disabled:opacity-50"
                >
                  Verify & Continue
                </button>
              </>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}
          </>
        )}

        {tab === 'email' && (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded bg-gray-100 px-4 py-3"
            />
            <button className="w-full rounded bg-blue-500 text-white py-2">Send Magic Link</button>
          </div>
        )}

        <p className="text-center text-sm">
          New user?{' '}
          <a href="/signup" className="text-blue-600 underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
