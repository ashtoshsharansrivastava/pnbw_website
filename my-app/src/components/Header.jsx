// src/components/Header.jsx
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';

export default function Header() {
  const user   = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="flex items-center justify-between bg-skin-surface/80 backdrop-blur px-6 py-4 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold">
        <svg className="w-6 h-6" viewBox="0 0 48 48" fill="currentColor">
          <path d="M44 4H30.667V17.333H17.333V30.667H4V44H44V4Z" />
        </svg>
        PNBW-officials
      </Link>

      <nav className="hidden lg:flex gap-8 text-sm">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `hover:text-skin-accent ${isActive ? 'text-skin-accent' : 'text-white'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:text-skin-accent ${isActive ? 'text-skin-accent' : 'text-white'}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `hover:text-skin-accent ${isActive ? 'text-skin-accent' : 'text-white'}`
          }
        >
          Services
        </NavLink>
        {user?.role === 'broker' && (
          <NavLink
            to="/broker"
            className={({ isActive }) =>
              `hover:text-skin-accent ${isActive ? 'text-skin-accent' : 'text-white'}`
            }
          >
            Broker Dashboard
          </NavLink>
        )}
        {user?.role === 'admin' && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `hover:text-skin-accent ${isActive ? 'text-skin-accent' : 'text-white'}`
            }
          >
            Admin
          </NavLink>
        )}
      </nav>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm text-white"
            >
              Logout
            </button>
            <img
              src={user.avatar || 'https://i.pravatar.cc/40'}
              alt="User avatar"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-skin-accent hover:bg-skin-accent/90 rounded-full text-sm font-semibold text-white"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
