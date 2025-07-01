import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';

export default function SignUp() {
  const signup = useAuthStore((s) => s.signup);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', applyBroker: false, ref: ''
  });
  const navigate = useNavigate();

  const handle = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [key]: val });
  };

  const handleSubmit = async () => {
    try {
      await signup(form);
      navigate('/', { replace: true });
    } catch {
      // handle error…
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#36454F' }}
    >
      <div className="mx-auto max-w-sm w-full space-y-6 bg-white p-6 rounded-xl shadow">
        <h1 className="text-center text-3xl font-bold text-gray-800">Create account</h1>

        <input
          onChange={handle('name')}
          value={form.name}
          placeholder="Full Name"
          className="w-full rounded bg-gray-100 px-4 py-3"
        />
        <input
          onChange={handle('email')}
          value={form.email}
          placeholder="Email"
          className="w-full rounded bg-gray-100 px-4 py-3"
        />
        <input
          onChange={handle('phone')}
          value={form.phone}
          placeholder="Phone"
          className="w-full rounded bg-gray-100 px-4 py-3"
        />

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.applyBroker}
            onChange={handle('applyBroker')}
          />
          Apply to become a broker
        </label>

        {form.applyBroker && (
          <input
            onChange={handle('ref')}
            value={form.ref}
            placeholder="Referral Code (optional)"
            className="w-full rounded bg-gray-100 px-4 py-3"
          />
        )}

        <button
          onClick={handleSubmit}
          className="w-full rounded bg-blue-600 text-white py-2 font-bold hover:bg-blue-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
