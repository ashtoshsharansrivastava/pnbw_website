import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
// We don't need a custom CSS file for this approach, so we can remove this import if it exists.
// import './Footer.css';

export default function Footer() {
  const socialIcons = [
    { href: 'https://x.com', icon: Twitter, color: 'hover:text-[#1DA1F2]' },
    { href: 'https://facebook.com', icon: Facebook, color: 'hover:text-[#4267B2]' },
    { href: 'https://instagram.com', icon: Instagram, color: 'hover:text-[#E1306C]' },
    { href: 'https://linkedin.com', icon: Linkedin, color: 'hover:text-[#0077B5]' },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#1c1c1c] via-[#121212] to-black text-white py-12 sm:py-16 border-t border-gray-800 shadow-[0_-8px_30px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-24 flex flex-col sm:flex-row items-center justify-between gap-8">
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
          <Link to="/" className="flex items-center gap-3">
            <motion.img
              src="/images/logo.jpg"
              alt="PNBW Official Logo"
              className="w-12 h-12 rounded-full object-cover border-4 border-amber-400 shadow-[0_0_15px_rgba(255,191,0,0.8)]"
              initial={{ rotate: 0, scale: 1 }}
              whileHover={{ rotate: -12, scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            />
            <span className="header-title text-3xl font-extrabold tracking-wide">
              <span
                // This is the original text styling, which works perfectly on a dark background.
                className="bg-gradient-to-t from-[#000000] via-[#ff4d4d] to-[#ff3b3b] bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(0,0,0,0.65)]"
              >
                PixieNest BuildWell
              </span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm mt-2">
            © {new Date().getFullYear()} PixieNest BuildWell Pvt Ltd. All rights reserved.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-6 text-2xl">
          {socialIcons.map(({ href, icon: Icon, color }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 ${color} transition-colors duration-300 transform hover:scale-125`}
              whileHover={{ scale: 1.25 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon size={28} />
            </motion.a>
          ))}
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center sm:items-end text-center sm:text-right space-y-2">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <Link to="/" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm">Home</Link>
          <Link to="/about" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm">About Us</Link>
          <Link to="/services" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm">Services</Link>
          <Link to="/properties" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm">Properties</Link>
          <Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm">Contact</Link>
        </div>
      </div>
    </footer>
  );
}