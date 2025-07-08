// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',   // adjust to your paths
  ],
  darkMode: 'class',                // or 'media' if you prefer
  theme: {
    extend: {
      /* 1. Colours ------------------------------------------------ */
      colors: {
        midnight:  '#0b1526',
        'nav-bg':  '#112131',
        'accent':  '#0b80ee',
        'card-bg': '#131f2c',
      },

      /* 2. Font families ----------------------------------------- */
      fontFamily: {
        sans: ['Inter', '"Noto Sans"', 'sans-serif'],
      },

      /* 3. Shadow / blur / spacing tweaks (example) -------------- */
      boxShadow: {
        card: '0 2px 4px rgba(0,0,0,0.25)',
      },
      spacing: {
        header: '1.25rem',          // so you can write `py-header`
      },

      /* 4. Custom container sizes -------------------------------- */
      screens: {
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
}
