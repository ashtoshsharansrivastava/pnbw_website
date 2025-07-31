import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, LayoutDashboard, Settings, LifeBuoy } from 'lucide-react'; // Import Lucide icons

export default function Dashboard() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="w-full max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center drop-shadow-md">
          Admin <span className="text-blue-600">Dashboard</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manage Brokers Card */}
          <Link
            to="brokers"
            className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100
                       hover:bg-blue-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-blue-600 mb-4">
              <Users size={64} strokeWidth={1.5} />
            </div>
            <span className="text-2xl font-bold text-gray-900 mb-2">Manage Brokers</span>
            <p className="text-gray-600 text-center">Oversee broker accounts, performance, and approvals.</p>
          </Link>

          {/* Manage Sites Card */}
          <Link
            to="sites"
            className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100
                       hover:bg-blue-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-blue-600 mb-4">
              <MapPin size={64} strokeWidth={1.5} />
            </div>
            <span className="text-2xl font-bold text-gray-900 mb-2">Manage Sites</span>
            <p className="text-gray-600 text-center">Add, edit, and remove property listings and locations.</p>
          </Link>

          {/* Placeholder for other admin actions */}
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100
                          hover:bg-blue-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-gray-500 mb-4">
              <Settings size={64} strokeWidth={1.5} />
            </div>
            <span className="text-2xl font-bold text-gray-900 mb-2">System Settings</span>
            <p className="text-gray-600 text-center">Configure application-wide parameters and preferences.</p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100
                          hover:bg-blue-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-gray-500 mb-4">
              <LifeBuoy size={64} strokeWidth={1.5} />
            </div>
            <span className="text-2xl font-bold text-gray-900 mb-2">Support & Help</span>
            <p className="text-gray-600 text-center">Access documentation and support resources.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
