// src/components/Header.jsx
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { motion } from 'framer-motion';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const btnBase =
    'px-12 py-6 text-3xl rounded-full font-bold transition-all duration-300 transform hover:scale-105';
  const navIdle = 'text-white hover:text-accent';
  const navActive = 'text-accent border-b-4 border-accent';
  const authBtn = 'bg-accent text-white hover:bg-accent/80 backdrop-blur';

  const navLinks = [
    { to: '/', label: 'Home', exact: true },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-12 py-8 bg-black/40 backdrop-blur-lg shadow-2xl">
      <Link to="/" className="flex items-center gap-4">
        <motion.img
          src="/images/logo.jpg"
          alt="PNBW Official Logo"
          className="w-16 h-16"
          initial={{ rotate: 0, scale: 1 }}
          whileHover={{ rotate: 12, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
        <motion.h1
          className="header-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <span className="primary">PNBW</span>{' '}
          <span className="secondary">Official</span>
        </motion.h1>
      </Link>

      <div className="flex items-center gap-12">
        <nav className="flex gap-8">
          {navLinks.map(({ to, label, exact }) => (
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
