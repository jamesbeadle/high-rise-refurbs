/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0b1322',
          900: '#101a2c',
          850: '#131f34',
          800: '#182741',
          700: '#22355a',
          500: '#2a4a8a',
          400: '#4266ad'
        },
        gold: {
          DEFAULT: '#c9a44c',
          light: '#dfc57e',
          pale: '#efe3bd',
          dim: '#8a7136'
        },
        ivory: '#f2efe7',
        mist: '#9aa5b8'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        widest2: '0.3em'
      }
    }
  },
  plugins: []
};
