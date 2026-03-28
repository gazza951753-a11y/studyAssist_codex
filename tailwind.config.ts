import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        background: '#FAFAF7',
        surface: '#FFFFFF',
        cardBg: '#F5F0E8',
        textPrimary: '#1C1C1E',
        textSecondary: '#6B7280',
        border: '#E8E4DC',
        accent: '#E07A2F',
        accentHover: '#C96820'
      },
      boxShadow: {
        card: '0 2px 12px rgba(28, 28, 30, 0.06)',
        cardHover: '0 8px 32px rgba(28, 28, 30, 0.10)',
        orange: '0 4px 20px rgba(224, 122, 47, 0.25)'
      },
      borderRadius: {
        card: '16px',
        btn: '10px'
      }
    }
  },
  plugins: []
};

export default config;
