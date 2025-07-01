import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <section className="min-h-screen bg-[#36454F] py-10 flex justify-center">
      <div className="w-full max-w-[960px] space-y-8 bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="brokers"
            className="flex items-center gap-4 p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <span className="text-2xl">👥</span>
            <span className="text-lg font-medium text-gray-800">Manage Brokers</span>
          </Link>

          <Link
            to="sites"
            className="flex items-center gap-4 p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <span className="text-2xl">🌐</span>
            <span className="text-lg font-medium text-gray-800">Manage Sites</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
