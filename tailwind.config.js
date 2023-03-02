/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fill: (theme) => ({
        white: theme('colors.white'),
      }),
      backgroundColor: (theme) => ({
        light: theme('colors.gray-main.300'),
        dark: theme('colors.blue-main.900'),
      }),
      colors: {
        'red-main': {
          600: '#F43D35',
        },
        'gray-main': {
          300: '#EAEDF2',
        },
        'blue-main': {
          800: '#0d1131',
          900: '#070919',
        },
      },
    },
    container: {
      center: true,
    },
  },
  variants: {
    opacity: ['responsive', 'hover'],
  },
  experimental: {
    darkModeVariant: true,
  },
  dark: 'class',
};
