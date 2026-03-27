import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        background: '#0F0F1A',
        surface: '#1A1A2E',
        textPrimary: '#F1F5F9',
        textSecondary: '#94A3B8',
        accent: '#F59E0B'
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6C3EF4 0%, #3B82F6 100%)'
      },
      boxShadow: {
        glow: '0 0 20px rgba(108, 62, 244, 0.5)'
      }
    }
  },
  plugins: []
};

export default config;
