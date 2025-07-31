import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { motion } from 'framer-motion';
import './Header.css'; // Assuming this CSS file contains the header-title gradient

export default function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  // Redesigned button and navigation link styles for a more premium feel
  const btnBase =
    'px-6 py-2.5 text-lg rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md';
  const navIdle = 'text-gray-200 hover:text-blue-300 hover:shadow-lg'; // Softer, more inviting hover
  const navActive = 'text-blue-400 border-b-4 border-blue-400 pb-1.5 font-extrabold'; // Stronger active state with thicker border
  const authBtn = 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl'; // Gradient for auth button

  const navLinks = [
    { to: '/', label: 'Home', exact: true },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/properties', label: 'Properties' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-gradient-to-r from-gray-900 to-black backdrop-blur-xl shadow-2xl border-b border-gray-700">
      <Link to="/" className="flex items-center gap-5"> {/* Increased gap */}
        <motion.img
          src="/images/logo.jpg" // Ensure this path is correct for your project
          alt="PNBW Official Logo"
          className="w-16 h-16 rounded-full object-cover border-3 border-blue-500 shadow-xl" // Larger, more prominent, thicker border, stronger shadow
          initial={{ rotate: 0, scale: 1 }}
          whileHover={{ rotate: 15, scale: 1.15 }} // More pronounced hover effect
          transition={{ type: 'spring', stiffness: 300, damping: 15 }} // Adjusted spring physics
        />
        <motion.h1
          className="header-title text-4xl font-extrabold text-white tracking-wide" // Larger, bolder, wider tracking
          initial={{ opacity: 0, x: -50 }} // Slide in from left more
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }} // Slightly longer delay and duration
        >
          <span className="primary text-blue-400">PNBW</span>{' '} {/* Explicit primary color */}
          <span className="secondary text-white">Official</span> {/* Explicit secondary color */}
        </motion.h1>
      </Link>

      <div className="flex items-center gap-10"> {/* Increased gap */}
        <nav className="flex gap-7"> {/* Increased gap between nav items */}
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
            whileHover={{ scale: 1.08 }} // Slightly more pronounced hover
            whileTap={{ scale: 0.92 }} // Slightly more pronounced tap
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