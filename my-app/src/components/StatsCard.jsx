// src/components/StatsCard.jsx
import React from 'react';

export default function StatsCard({ label, value }) {
  return (
    <div className="p-4 bg-skin-surface rounded-lg text-center">
      <p className="text-sm text-[#90aecb]">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
