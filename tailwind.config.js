/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        primary: 'var(--primary)',

      },
      display: ["group-hover"],
      minWidth: {
        96: '24rem',
        64: '16rem'
      },
      height: {
        128: '32rem',
      },
      width: {
        128: '32rem'
      }

    },
  },
  plugins: [],
}
