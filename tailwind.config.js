/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        bespoke: ['var(--font-bespoke)'],
        supreme: ['var(--font-supreme)']
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require('tailwindcss-animate'), require('daisyui')],
  daisyui: {
    themes: ['dracula', 'garden'],
    darkTheme: 'dracula'
  }
}
