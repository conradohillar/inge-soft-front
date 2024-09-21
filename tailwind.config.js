/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#59A58A',
        background: '#FFFFFF',
        background2: '#F5F5F5',
      },
      fontFamily: {
        qbold: ["Quicksand-Bold"],
        qlight: ["Quicksand-Light"],
        qmedium: ["Quicksand-Medium"],
        qregular: ["Quicksand-Regular"],
        qsemibold: ["Quicksand-SemiBold"],
      },
    },
  },
  plugins: [],
}