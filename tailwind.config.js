/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4fc4cf",
          "secondary": "#994ff3",
          "accent": "#fbdd74",
          "neutral": "#181818",
          "text-base-100": "#181818",
          "base-100": "#fffffe",
          "base-200": "#f2eef5",
        },
      },
      "dark"
    ],
  },
};

