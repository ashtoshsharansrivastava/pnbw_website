// src/components/Loader.jsx
import React from 'react';
import { motion } from 'framer-motion';  // ← add this line

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'linear',
        }}
      />
    </div>
  );
}
