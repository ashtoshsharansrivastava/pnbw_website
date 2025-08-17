import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import * as authApi from '../../api/auth'; // Import the new auth API functions

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // New state to manage the form's view (e.g., 'login', 'forgotPassword')
  const [view, setView] = useState('login'); 
  const [message, setMessage] = useState(''); // For success messages

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles the standard login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await login(formData);
      if (user && user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  // --- NEW: Handles the "Forgot Password" submission ---
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setMessage('');
    try {
      // Call the new API function
      const data = await authApi.forgotPassword({ email: formData.email });
      setMessage(data.message);
      setView('message'); // Switch to a view that shows the success message
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send reset email.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Renders the main login form
  const renderLoginForm = () => (
    <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>}
      <label className="block">
        <span className="text-gray-700">Email Address</span>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="mt-1 block w-full input-style" />
      </label>
      <label className="block">
        <span className="text-gray-700">Password</span>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required className="mt-1 block w-full input-style" />
      </label>
      <div className="text-right">
        <button type="button" onClick={() => setView('forgotPassword')} className="text-sm text-indigo-600 hover:underline">
          Forgot Password?
        </button>
      </div>
      <button type="submit" disabled={loading} className="w-full btn-primary">
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );

  // --- NEW: Renders the "Forgot Password" form ---
  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPasswordSubmit} className="p-6 space-y-4">
      <p className="text-gray-600 text-center">Enter your email address and we'll send you a link to reset your password.</p>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>}
      <label className="block">
        <span className="text-gray-700">Email Address</span>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="mt-1 block w-full input-style" />
      </label>
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => setView('login')} className="text-sm text-indigo-600 hover:underline">
          Back to Login
        </button>
        <button type="submit" disabled={loading} className="btn-primary-small">
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </div>
    </form>
  );

  // --- NEW: Renders the success message view ---
  const renderMessageView = () => (
    <div className="p-6 text-center space-y-4">
      <p className="text-green-700 bg-green-100 p-4 rounded-md">{message}</p>
      <button onClick={() => setView('login')} className="text-indigo-600 hover:underline">
        Back to Login
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 text-white text-center py-4">
          <h1 className="text-2xl font-bold">
            {view === 'login' && 'Log In to Your Account'}
            {view === 'forgotPassword' && 'Reset Your Password'}
            {view === 'message' && 'Check Your Email'}
          </h1>
        </div>

        {view === 'login' && renderLoginForm()}
        {view === 'forgotPassword' && renderForgotPasswordForm()}
        {view === 'message' && renderMessageView()}

        <div className="bg-gray-50 text-center py-4">
          <p className="text-sm text-gray-700">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
