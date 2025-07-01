// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate }     from 'react-router-dom';
import { useAuthStore }    from '../../store/useAuthStore.js';

export default function Login() {
  const login    = useAuthStore((s) => s.login);
  const [tab, setTab]       = useState('phone');
  const [phone, setPhone]   = useState('');
  const [otp, setOtp]       = useState('');
  const [step, setStep]     = useState('enterPhone');
  const [error, setError]   = useState(null);
  const navigate            = useNavigate();

  const handleSendOtp = async () => {
    setError(null);
    try {
      /* call your OTP API here */
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
    <div className="mx-auto max-w-sm space-y-6">
      <h1 className="text-center text-3xl font-bold">Welcome back</h1>
      <div className="flex gap-4 border-b border-skin-surface pb-2">
        <button onClick={() => { setTab('phone'); setStep('enterPhone'); setError(null); }}
          className={`pb-1 ${tab==='phone'&&'border-b-2 border-skin-accent'}`}
        >
          Phone
        </button>
        <button onClick={() => { setTab('email'); setError(null); }}
          className={`pb-1 ${tab==='email'&&'border-b-2 border-skin-accent'}`}
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
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full rounded bg-skin-surface px-4 py-3"
              />
              <button
                onClick={handleSendOtp}
                disabled={!phone}
                className="w-full rounded bg-skin-accent py-2 disabled:opacity-50"
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <input
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full rounded bg-skin-surface px-4 py-3"
              />
              <button
                onClick={handleVerify}
                disabled={!otp}
                className="w-full rounded bg-skin-accent py-2 disabled:opacity-50"
              >
                Verify & Continue
              </button>
            </>
          )}
          {error && <p className="text-center text-red-400">{error}</p>}
        </>
      )}

      {tab === 'email' && (
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded bg-skin-surface px-4 py-3"
          />
          <button className="w-full rounded bg-skin-accent py-2">Send Magic Link</button>
        </div>
      )}

      <p className="text-center text-sm">
        New user? <a href="/signup" className="text-skin-accent underline">Sign up</a>
      </p>
    </div>
  );
}
