/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'blob': 'blobFloat 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        'primary':    '#6366f1',
        'secondary':  '#8b5cf6',
        'accent':     '#06b6d4',
        'dark':       '#0c0a1e',
        'dark-light': '#160d35',
      },
      boxShadow: {
        'glow':    '0 0 24px rgba(99, 102, 241, 0.45)',
        'glow-lg': '0 0 48px rgba(99, 102, 241, 0.65)',
        'green':   '0 0 20px rgba(16, 185, 129, 0.4)',
      },
    },
  },
  plugins: [],
}
