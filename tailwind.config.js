/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        parchment: '#F5EFE6',
        card: '#FFFFFF',
        gold: {
          50: '#FDFBF7',
          100: '#FAF5EA',
          200: '#F4E8D0',
          300: '#EBD4A8',
          400: '#DFBC7A',
          500: '#C5A059',
          600: '#B08841',
          700: '#8E6B2C',
          800: '#6C4F20',
          900: '#4D3616',
        },
        regal: {
          green: '#142A24',
          slate: '#243430',
          dark: '#161F1D',
          muted: '#626E6A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        arabic: ['"Amiri"', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3DFAC 0%, #D8B266 50%, #9F7628 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #B08841 0%, #F5DFB3 50%, #B08841 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(253, 250, 245, 0.95) 100%)',
        'envelope-gradient': 'linear-gradient(135deg, #1C2E29 0%, #11201B 100%)',
      },
      boxShadow: {
        'card': '0 20px 50px -15px rgba(20, 42, 36, 0.12), 0 0 0 1px rgba(197, 160, 89, 0.25)',
        'floating': '0 30px 60px -12px rgba(20, 42, 36, 0.25)',
        'gold-glow': '0 0 25px rgba(197, 160, 89, 0.35)',
        'inner-gold': 'inset 0 0 0 1px rgba(197, 160, 89, 0.3)',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'shimmer': 'shimmer 4s linear infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      }
    },
  },
  plugins: [],
}
