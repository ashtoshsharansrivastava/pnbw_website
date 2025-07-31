// src/store/useAuthStore.js
import {create} from 'zustand';
import * as authAPI from '../api/auth.js';

export const useAuthStore = create((set) => ({
  // Initialize from whatever’s in localStorage (or null)
  user: authAPI.getCurrentUser() || null,

  // Log in with { phone, otp } or { email, otp }
  login: async (creds) => {
    const u = await authAPI.login(creds);
    set({ user: u });
    return u;
  },

  // Sign up with your full data object
  signup: async (data) => {
    const u = await authAPI.signup(data);
    set({ user: u });
    return u;
  },

  // Clear out the user
  logout: () => {
    authAPI.logout();
    set({ user: null });
  },
}));
