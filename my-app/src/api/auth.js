// src/api/auth.js

const LS_KEY = 'pnwb-user';

/**
 * Get the currently logged-in user (from localStorage).
 */
export function getCurrentUser() {
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Simulate logging in with phone & OTP.
 * @param {{ phone: string, otp: string }} payload
 */
export async function login({ phone, otp }) {
  // (Use phone & otp in your real API call; here we just log them)
  console.log(`Logging in with phone=${phone}, otp=${otp}`);

  // Simulate a returned user object
  const user = {
    id: Date.now(),
    name: 'Demo User',
    phone,
    role: 'user',
    avatar: ''
  };

  localStorage.setItem(LS_KEY, JSON.stringify(user));
  return user;
}

/**
 * Simulate signing up.
 * @param {{ name: string, email: string, phone: string, applyBroker: boolean, ref?: string }} data
 */
export async function signup({ name, email, phone, applyBroker, ref }) {
  console.log('Signing up user:', { name, email, phone, applyBroker, ref });

  const user = {
    id: Date.now(),
    name,
    email,
    phone,
    role: applyBroker ? 'broker' : 'user',
    avatar: '',
    referral: ref || null
  };

  localStorage.setItem(LS_KEY, JSON.stringify(user));
  return user;
}

/**
 * Log out by clearing localStorage.
 */
export function logout() {
  localStorage.removeItem(LS_KEY);
}
