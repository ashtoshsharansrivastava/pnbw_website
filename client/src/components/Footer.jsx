import React from 'react';

export default function Footer() {
  return (
    <footer>
      <p>© {new Date().getFullYear()} PixieNest BuildWell Official</p>
      <div className="social-links">
        <a href="#"><img src="/images/instagram.png" alt="Instagram" /></a>
        <a href="#"><img src="/images/linkedin.png" alt="LinkedIn" /></a>
        <a href="#"><img src="/images/twitter.png" alt="Twitter" /></a>
      </div>
    </footer>
  );
}
