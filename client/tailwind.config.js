/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        wider1: '.1em',
        widest: '.25em',
        widest_xl: '.1em'
      },
      skew: { 325: '325deg' },
      spacing: {
        m2px: '-2px',
        '1/5': '20%'
      }
    }
  },
  plugins: []
}
