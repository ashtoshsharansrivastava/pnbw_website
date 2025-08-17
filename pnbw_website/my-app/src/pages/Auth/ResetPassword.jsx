import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    try {
      // In a real app, you would call your backend here
      // await api.post(`/auth/reset-password/${token}`, { password });
      console.log('Password has been reset successfully.');
      setSuccess("Your password has been reset! You can now log in.");
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      setError("Failed to reset password. The link may be invalid or expired.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm mx-auto p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <h1 className="text-center text-3xl font-extrabold text-gray-800">
          Set New Password
        </h1>
        
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              required
              className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              required
              className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!password || !confirmPassword}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold disabled:opacity-40"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <p className="text-center text-green-500 font-medium">{success}</p>
        )}
        
        {error && <p className="text-center text-red-500 font-medium">{error}</p>}
      </div>
    </div>
  );
}