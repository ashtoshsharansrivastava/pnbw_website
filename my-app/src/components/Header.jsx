// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { motion } from 'framer-motion';

export default function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  /* search / sort state shared with SearchBar */
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('popular');

  /* button style helpers */
  const btnBase =
    'px-12 py-6 text-3xl rounded-full font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg';
  const navIdle = 'text-white hover:text-accent bg-transparent';
  const navActive = 'text-accent bg-transparent border-b-4 border-accent';
  const authBtn = 'bg-accent text-white hover:bg-accent/80 backdrop-blur';

  /* navigation map */
  const nav = [
    { to: '/', label: 'Home', exact: true },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-12 py-12 bg-black/40 backdrop-blur-lg shadow-2xl">
      {/* ───────────────── Logo ───────────────── */}
      <Link
        to="/"
        className="flex items-center gap-6 text-7xl font-extrabold text-white hover:text-accent transition-colors"
      >
        <img
          src="/images/logo.jpg"  // Path to the image
          alt="Logo"
          className="w-16 h-16 transform transition-all hover:rotate-12 hover:scale-110"
        />
        PNBW-officials
      </Link>

      {/* ──────────────── Right cluster ──────────────── */}
      <div className="flex items-center gap-12">
        {/* Nav links */}
        <nav className="flex gap-12">
          {nav.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `${btnBase} ${isActive ? navActive : navIdle}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Auth */}
        {user ? (
          <motion.button
            onClick={handleLogout}
            className={`${btnBase} ${authBtn}`}
            whileHover={{ scale: 1.05 }}
          >
            Logout
          </motion.button>
        ) : (
          <Link to="/login" className={`${btnBase} ${authBtn}`}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
