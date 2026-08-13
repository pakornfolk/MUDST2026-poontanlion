/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nike: {
          ink: '#0f172a',
          canvas: '#ffffff',
          'soft-cloud': '#f8fafc',
          charcoal: '#1e293b',
          ash: '#334155',
          mute: '#475569',
          stone: '#64748b',
          hairline: '#e2e8f0',
          'hairline-soft': '#f1f5f9',
          sale: '#d30005',
          'sale-deep': '#780700',
          success: '#007d48',
          'success-bright': '#1eaa52',
          info: '#1151ff',
          'info-deep': '#0034e3',
          'accent-pink': '#ed1aa0',
          'accent-teal': '#0a7281',
          // High-contrast Dark mode surfaces & borders
          'dark-surface': '#0b1329',
          'dark-elevated': '#172036',
          'dark-card': '#334155',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Anton', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        sm: '18px',
        md: '24px',
        lg: '30px',
        full: '9999px',
      },
      spacing: {
        'section': '48px',
      },
      fontSize: {
        'campaign': ['96px', { lineHeight: '0.9', fontWeight: '400' }],
        'campaign-md': ['64px', { lineHeight: '0.9', fontWeight: '400' }],
        'campaign-sm': ['48px', { lineHeight: '0.9', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
