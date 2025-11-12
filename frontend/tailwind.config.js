/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'future-blue': '#0066ff',
        'future-purple': '#6366f1',
        'future-dark': '#0a0a0a',
        'warm-cream': '#f8f6f0',
        'warm-brown': '#8b7355',
        'soft-orange': '#d4851c',
        'muted-green': '#6b7f5a',
      },
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'acoustic': ['Georgia', 'Baskerville', 'serif'],
      }
    },
  },
  plugins: [],
}