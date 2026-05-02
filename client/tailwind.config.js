/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0c',
        foreground: '#ffffff',
        card: '#16161a',
        accent: {
          primary: '#6366f1',
          secondary: '#a855f7',
          success: '#22c55e',
          warning: '#eab308',
          danger: '#ef4444',
        },
        muted: '#94a3b8',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
      }
    },
  },
  plugins: [],
}
