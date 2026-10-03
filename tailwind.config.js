/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cova: {
          bg: 'var(--cova-bg)',
          surface: 'var(--cova-surface)',
          elevated: 'var(--cova-elevated)',
          primary: '#2F80FF',
          accent: '#3FA9FF',
          text: 'var(--cova-text)',
          muted: 'var(--cova-muted)',
          border: 'var(--cova-border)',
          success: '#35D07F',
          warning: '#F5B942',
          danger: '#FF5C6C',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        cova: '0.75rem',
      },
    },
  },
  plugins: [],
};
