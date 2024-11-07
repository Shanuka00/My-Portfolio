/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        chocolate: {
          primary: 'rgb(var(--color-primary))',
          secondary: 'rgb(var(--color-secondary))',
          accent: 'rgb(var(--color-accent))',
        }
      },
      backgroundColor: {
        chocolate: {
          primary: 'rgb(var(--color-primary))',
          secondary: 'rgb(var(--color-secondary))',
          accent: 'rgb(var(--color-accent) / 0.1)',
        }
      },
      textColor: {
        chocolate: {
          primary: 'rgb(var(--color-primary))',
          secondary: 'rgb(var(--color-secondary))',
          accent: 'rgb(var(--color-accent))',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
      },
    },
  },
  plugins: [],
};