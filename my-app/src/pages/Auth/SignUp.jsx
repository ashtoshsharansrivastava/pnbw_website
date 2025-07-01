// src/pages/Auth/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate }     from 'react-router-dom';
import { useAuthStore }    from '../../store/useAuthStore.js';

export default function SignUp() {
  const signup   = useAuthStore((s) => s.signup);
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
    <div className="mx-auto max-w-sm space-y-6">
      <h1 className="text-center text-3xl font-bold">Create account</h1>
      <input onChange={handle('name')} value={form.name}
        placeholder="Full Name" className="w-full rounded bg-skin-surface px-4 py-3"
      />
      <input onChange={handle('email')} value={form.email}
        placeholder="Email"     className="w-full rounded bg-skin-surface px-4 py-3"
      />
      <input onChange={handle('phone')} value={form.phone}
        placeholder="Phone"     className="w-full rounded bg-skin-surface px-4 py-3"
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.applyBroker} onChange={handle('applyBroker')} />
        Apply to become a broker
      </label>
      {form.applyBroker && (
        <input onChange={handle('ref')} value={form.ref}
          placeholder="Referral Code (optional)" className="w-full rounded bg-skin-surface px-4 py-3"
        />
      )}
      <button onClick={handleSubmit}
        className="w-full rounded bg-skin-accent py-2 font-bold"
      >
        Sign Up
      </button>
    </div>
  );
}
