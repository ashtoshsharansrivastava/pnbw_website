import React from 'react';

export default function SidePanel() {
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 p-4 rounded-l-lg shadow-lg">
      <div className="flex flex-col gap-4">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <button className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
            <img src="/images/instagram-icon.png" alt="Instagram" className="w-8 h-8" />
          </button>
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
            <img src="/images/facebook-icon.png" alt="Facebook" className="w-8 h-8" />
          </button>
        </a>
        <a href="mailto:someone@example.com">
          <button className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center">
            <img src="/images/mail-icon.png" alt="Mail" className="w-8 h-8" />
          </button>
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <button className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center">
            <img src="/images/linkedin-icon.png" alt="LinkedIn" className="w-8 h-8" />
          </button>
        </a>
      </div>
    </div>
  );
}
