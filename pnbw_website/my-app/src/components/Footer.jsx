import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'; // Importing Lucide icons

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-24 flex flex-col sm:flex-row items-center justify-between gap-8">

        {/* Logo and Copyright */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
          <Link to="/" className="flex items-center gap-3">
            {/* Assuming logo is accessible here, or you can use a text logo */}
            <img
              src="/images/logo.jpg" // Ensure this path is correct for your project
              alt="PNBW Official Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
            />
            <span className="text-2xl font-extrabold text-white tracking-wide">
              PNBW <span className="text-blue-400">Official</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm mt-2">
            © {new Date().getFullYear()} PixieNest BuildWell Pvt Ltd. All rights reserved.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-6 text-2xl">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
          >
            <Twitter size={28} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110"
          >
            <Facebook size={28} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-400 hover:text-pink-500 transition-colors duration-300 transform hover:scale-110"
          >
            <Instagram size={28} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-blue-700 transition-colors duration-300 transform hover:scale-110"
          >
            <Linkedin size={28} />
          </a>
        </div>

        {/* Quick Links (Optional, can be expanded) */}
        <div className="flex flex-col items-center sm:items-end text-center sm:text-right space-y-2">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">About Us</Link>
          <Link to="/services" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Services</Link>
          <Link to="/properties" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Properties</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
