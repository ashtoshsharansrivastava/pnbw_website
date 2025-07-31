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
    /* ── legacy nick-names (still usable anywhere) ─────────── */
    midnight : '#0b1526',
    'nav-bg' : '#112131',
    accent   : '#0b80ee',
    'card-bg': '#131f2c',

    /* ── design-token palette driven by CSS variables ─────── */
    'skin-base'         : 'var(--color-surface-0)',
    'skin-surface'      : 'var(--color-surface-1)',
    'skin-surface-muted': 'var(--color-surface-2)',
    'skin-input'        : 'var(--color-input)',
    'skin-border'       : 'var(--color-border)',

    'skin-text'         : 'var(--color-text)',
    'skin-muted'        : 'var(--color-muted)',

    'skin-accent'       : 'var(--color-accent)',
    'skin-accent-hover' : 'var(--color-accent-hover)',
    'skin-onaccent'     : 'var(--color-onaccent)',

    /* NEW: dedicated header strip colour (light blue) */
    'skin-header'       : 'var(--color-header)',
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
