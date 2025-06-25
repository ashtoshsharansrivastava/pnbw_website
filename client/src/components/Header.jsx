import React from 'react';

export default function Header({ user, setUser }) {
  const handleLogout = () => {
    // clear session
  };

  return (
    <header>
      <div className="header-left">
        <img src="/images/logo.jpg" alt="PNBW Logo" className="logo" />
        <h1>PixieNest BuildWell Official</h1>
      </div>
      <div className="hamburger" id="hamburger-btn">
        <span/><span/><span/>
      </div>
      <nav className="top-nav">
        <a href="#home-section">Home</a>
        <a href="#about">About</a>
        <a href="#services-section">Services</a>
        <a href="#intern-section">Apply for Intern</a>
        {user?.role === 'broker' && <a href="#broker-section">Broker Dashboard</a>}
        {user?.role === 'admin'  && <a href="#admin-section">Admin Panel</a>}
      </nav>
      <div className="user-area">
        {user
          ? <>
              <span>{user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          : <button id="login-btn">Login</button>}
      </div>
    </header>
  );
}
