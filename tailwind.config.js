/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' }
        }
      },
      animation: {
        shake: 'shake 0.5s ease-in-out infinite'
      }
    }
  }
}