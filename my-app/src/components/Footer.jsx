export default function Footer() {
    return (
      <footer className="flex flex-col items-center gap-4 py-10 text-center text-[#899] text-sm">
        <div className="flex gap-6 text-xl">
          <a href="#" aria-label="Twitter">🐦</a>
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="Instagram">📸</a>
        </div>
        <p>© {new Date().getFullYear()} PNBW‑officials. All rights reserved.</p>
      </footer>
    );
  }
 
 
  