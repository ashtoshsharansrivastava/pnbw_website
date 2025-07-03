// src/components/Header.jsx
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'
import SearchBar from './SearchBar.jsx'

export default function Header() {
  const user     = useAuthStore(s => s.user)
  const logout   = useAuthStore(s => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  /* core button styles */
  const btnBase = 'px-8 py-4 rounded-md font-semibold transition-colors duration-300 focus:outline-none'

  /* NAV buttons: white text, red background variants (translucent) */
  const navIdle   = 'bg-red-600/20 text-white hover:bg-red-600/40'
  const navActive = 'bg-red-700/70 text-white shadow-lg'

  /* login / logout translucent white */
  const miscBtnIdle = 'bg-white/10 text-white hover:bg-white/20 backdrop-blur'

  const navItems = [
    { to: '/',        label: 'Home'     },
    { to: '/about',   label: 'About'    },
    { to: '/services',label: 'Services' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-slate-900/10 backdrop-blur px-12 py-6 flex items-center gap-8">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 text-4xl font-extrabold text-white">
        <svg className="w-8 h-8" viewBox="0 0 48 48" fill="currentColor">
          <path d="M44 4H30.667V17.333H17.333V30.667H4V44H44V4Z" />
        </svg>
        PNBW-officials
      </Link>

      {/* Nav links */}
      <nav className="flex space-x-28">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `${btnBase} ${isActive ? navActive : navIdle}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Auth + Search */}
      <div className="flex items-center space-x-8">
        {user ? (
          <button onClick={handleLogout} className={`${btnBase} ${miscBtnIdle}`}>Logout</button>
        ) : (
          <Link to="/login" className={`${btnBase} ${miscBtnIdle}`}>Login</Link>
        )}

        <SearchBar
          value=""
          onChange={() => {}}
          sort="Popular"
          onSort={() => {}}
          onSearch={(q)=>navigate(`/?search=${encodeURIComponent(q)}`)}
          className="h-14 w-80 bg-white/5 backdrop-blur rounded-lg"
          inputClassName="px-4 py-3 text-sm text-gray-900 placeholder-gray-500"
          selectClassName="px-3 py-3 text-sm text-gray-900"
          buttonClassName="px-4 py-3 bg-indigo-600 hover:bg-indigo-700"
        />
      </div>
    </header>
  )
}
