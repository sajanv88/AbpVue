/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // or 'media' or 'class'
  content: [
    "node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
