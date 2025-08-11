/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/components/**/*",
    "./app/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        red: "#B23850",
        blue: {
          light: "#C4DBF6",
          DEFAULT: "#3B8BEB",
        },
        light: "#E7E3D4",
        slate: "#8590AA",
        dark: "#2F2E33",
      },
    },
  },
  plugins: [],
};
