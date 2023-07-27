/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  safelist: [
  ],
  daisyui: {
    themes: [
      {
        fastdapp: {
          "primary": "#FBCA14",
          "secondary": "#D84D0A",
          "accent": "#FBCA14",
          "neutral": "#201825",
          "base-100": "#fdfbfd",
          "info": "#2656d9",
          "success": "#209d7b",
          "warning": "#e8b22c",
          "error": "#f2110d",
        },
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter"
    ]
  }
}
