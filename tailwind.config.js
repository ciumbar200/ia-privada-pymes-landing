/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8fc',
          100: '#e9f0f9',
          200: '#d2e0f2',
          300: '#abc8e6',
          400: '#7aa8d7',
          500: '#4f88c7',
          600: '#376fae',
          700: '#2d5b8d',
          800: '#264d74',
          900: '#1a2e47',
          950: '#111f31',
        },
        graphite: {
          100: '#f5f6f7',
          200: '#e7eaee',
          300: '#cfd6de',
          400: '#9ba8b8',
          500: '#6f8195',
          600: '#506174',
          700: '#3d4b5a',
          800: '#283341',
          900: '#171f2a',
        },
        action: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        growth: {
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          700: '#15803d',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 30px -18px rgba(17, 31, 49, 0.24)',
        elevated: '0 24px 60px -28px rgba(17, 31, 49, 0.30)',
        cta: '0 16px 36px -16px rgba(234, 88, 12, 0.65)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.55' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'drift-side': {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(6px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms ease-out both',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'float-gentle': 'float-gentle 4.8s ease-in-out infinite',
        'drift-side': 'drift-side 5.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
