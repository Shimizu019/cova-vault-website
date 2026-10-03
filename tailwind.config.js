/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cova: {
          bg: 'rgb(var(--cova-bg-rgb) / <alpha-value>)',
          surface: 'rgb(var(--cova-surface-rgb) / <alpha-value>)',
          elevated: 'rgb(var(--cova-elevated-rgb) / <alpha-value>)',
          primary: 'rgb(var(--cova-primary-rgb) / <alpha-value>)',
          hover: 'rgb(var(--cova-primary-hover-rgb) / <alpha-value>)',
          accent: 'rgb(var(--cova-accent-rgb) / <alpha-value>)',
          violet: 'rgb(var(--cova-violet-rgb) / <alpha-value>)',
          text: 'rgb(var(--cova-text-rgb) / <alpha-value>)',
          muted: 'rgb(var(--cova-muted-rgb) / <alpha-value>)',
          faint: 'rgb(var(--cova-faint-rgb) / <alpha-value>)',
          border: 'rgb(var(--cova-border-rgb) / <alpha-value>)',
          success: 'rgb(var(--cova-success-rgb) / <alpha-value>)',
          warning: 'rgb(var(--cova-warning-rgb) / <alpha-value>)',
          danger: 'rgb(var(--cova-danger-rgb) / <alpha-value>)',
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
        btn: '0.625rem',
        card: '0.875rem',
        panel: '1rem',
        badge: '9999px',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        hover: 'var(--shadow-hover)',
        nav: 'var(--shadow-nav)',
        dialog: 'var(--shadow-dialog)',
        shot: 'var(--shadow-shot)',
        glow: 'var(--shadow-glow)',
        float: 'var(--shadow-float)',
      },
      fontSize: {
        display: ['clamp(2.5rem, 5.5vw, 4rem)', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        'section-title': ['clamp(1.85rem, 3.2vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        prose: '65ch',
        site: '72rem',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.55s cubic-bezier(0.2, 0.7, 0.3, 1) both',
        'fade-in': 'fade-in 0.4s ease both',
      },
    },
  },
  plugins: [
    // `light:` variant — the site marks the light theme with an `html.light` class.
    ({ addVariant }) => addVariant('light', 'html.light &'),
  ],
};
