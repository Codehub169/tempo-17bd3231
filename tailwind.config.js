/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B', // A playful red
        'primary-dark': '#CC5050', // Darker shade of primary
        secondary: '#4ECDC4', // A calming teal
        'secondary-dark': '#369993', // Darker shade of secondary
        accent: '#FFE66D', // A cheerful yellow
        'text-dark': '#333',
        'text-light': '#f4f4f4',
        'bg-light': '#f9f9f9',
        'bg-dark': '#2c3e50',
        'border-color': '#ddd',
      },
      boxShadow: {
        light: '0 4px 8px rgba(0, 0, 0, 0.05)',
        medium: '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        soft: '8px',
        round: '50%',
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '48px',
      },
      fontFamily: {
        heading: ['Quicksand', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};