// src/pages/Admin/AdminLayout.jsx
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';

export default function AdminLayout() {
  const user   = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-skin-base">
      {/* Sidebar */}
      <aside className="w-64 bg-skin-surface p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">PNBW Admin</h2>
        <nav className="flex-1 space-y-4 text-sm">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => 
              `block px-4 py-2 rounded hover:bg-skin-base/20 ${isActive ? 'bg-skin-accent/20' : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/brokers"
            className={({ isActive }) => 
              `block px-4 py-2 rounded hover:bg-skin-base/20 ${isActive ? 'bg-skin-accent/20' : ''}`
            }
          >
            Broker Management
          </NavLink>
          <NavLink
            to="/admin/sites"
            className={({ isActive }) => 
              `block px-4 py-2 rounded hover:bg-skin-base/20 ${isActive ? 'bg-skin-accent/20' : ''}`
            }
          >
            Site Management
          </NavLink>
          <NavLink
            to="#"
            className="block px-4 py-2 rounded hover:bg-skin-base/20"
          >
            Settings
          </NavLink>
          <NavLink
            to="#"
            className="block px-4 py-2 rounded hover:bg-skin-base/20"
          >
            Help
          </NavLink>
        </nav>

        {/* User & Logout */}
        {user && (
          <div className="mt-auto flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
            <img
              src={user.avatar || 'https://i.pravatar.cc/40'}
              alt="Admin avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
