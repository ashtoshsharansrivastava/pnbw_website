import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="brokers"
          className="flex items-center gap-4 p-6 bg-skin-surface rounded-lg hover:bg-skin-surface/80 transition"
        >
          <span className="text-2xl">👥</span>
          <span className="text-lg font-medium">Manage Brokers</span>
        </Link>
        <Link
          to="sites"
          className="flex items-center gap-4 p-6 bg-skin-surface rounded-lg hover:bg-skin-surface/80 transition"
        >
          <span className="text-2xl">🌐</span>
          <span className="text-lg font-medium">Manage Sites</span>
        </Link>
      </div>
    </div>
  );
}
