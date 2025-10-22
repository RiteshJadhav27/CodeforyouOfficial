// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#e7e5e5ff',   // subtle warm white
        surface: '#F4F4F5',      // light gray surface
        text: '#1C1C1E',         // rich charcoal black
        mutedText: '#555',       // softer secondary text
        border: '#E5E5E5',       // clean light border
        accent: '#D1D5DB',       // light accent gray
      },
    },
  },
  plugins: [],
}
