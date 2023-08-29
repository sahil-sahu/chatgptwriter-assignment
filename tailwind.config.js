/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  plugins: [],
  theme:{
    extend :{
      backgroundColor: {
        'sea-green': '#2293B0', // Replace with the actual sea green color code
      },
    }
  }
}