/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4f8',
          100: '#e2eaf2',
          200: '#c7d6e6',
          300: '#9bb8d1',
          400: '#6b93b8',
          500: '#4a749e',
          600: '#365a82',
          700: '#2c4867',
          800: '#243a55',
          900: '#1a2c40',
          950: '#0f1d2e',
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
        accent: {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#fecdca',
          300: '#fda29a',
          400: '#f97066',
          500: '#ef4444',
          600: '#d92d20',
          700: '#b42318',
          800: '#912018',
          900: '#7a1812',
        },
        electric: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        success: {
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          700: '#15803d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 24px -12px rgba(15, 29, 46, 0.15)',
        elevated: '0 20px 50px -24px rgba(15, 29, 46, 0.25)',
        glow: '0 0 40px -10px rgba(99, 102, 241, 0.4)',
        cta: '0 14px 30px -12px rgba(239, 68, 68, 0.5)',
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
          '50%': { transform: 'translateY(-6px)' },
        },
        'drift-side': {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(6px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms ease-out both',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'float-gentle': 'float-gentle 4.8s ease-in-out infinite',
        'drift-side': 'drift-side 5.5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}