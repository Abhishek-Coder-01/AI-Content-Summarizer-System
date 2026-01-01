/** @type {import('tailwindcss').Config} */
export default {
  // Use class strategy so we can toggle dark mode by adding `class="dark"` to <html>
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}