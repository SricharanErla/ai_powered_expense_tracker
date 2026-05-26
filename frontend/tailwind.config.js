import forms from '@tailwindcss/forms';
import { resolve } from 'node:path';

export default {
  content: [resolve(process.cwd(), 'frontend/index.html'), resolve(process.cwd(), 'frontend/src/**/*.{js,jsx,ts,tsx}')],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(15,23,42,0.45)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(59,130,246,0.28), transparent 32%), radial-gradient(circle at top right, rgba(16,185,129,0.18), transparent 26%), linear-gradient(180deg, rgba(15,23,42,1), rgba(2,6,23,1))'
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        }
      }
    }
  },
  plugins: [forms]
};