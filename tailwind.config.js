

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', 
    './pages/**/*.{js,ts,jsx,tsx}',  
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      
      boxShadow: {
        'custom-gray': '3px 3px #888888',
        'custom-black':'3px 3px black',
      },
    },
  },
  plugins: [],
};
