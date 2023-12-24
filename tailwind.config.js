/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontWeight:{
        'light': 300,
        'normal': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
        'extrabold': 800,
      },
      colors: {
        primary: '#779eb2',
        secondary: '#08172e',
        light: '#D1D5FF' ,
        grayShade: '#758d93',
        bg:'#2e2547',
      },
      boxShadow: {
        lightshadow: "rgba(0 ,0 ,0, 0.1) 0px 1px 4px 4px, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        darkshadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
      },
      fontFamily:{
        stylish: ['Black Ops One', 'cursive'],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ]
}
