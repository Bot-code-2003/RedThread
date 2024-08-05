/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable class-based dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purpleBlueStart: "#6a11cb",
        purpleBlueEnd: "#2575fc",
        post: {
          light: "#f3f4f6",
          medium: "#e5e7eb",
          dark: "#9ca3af",
          darker: "#6b7280",
        },
        primary: {
          light: "#ff7c7c",
          medium: "#ff4949",
          dark: "#b80000",
        },
        secondary: {
          light: "#6ab0f3",
          medium: "#468ed1",
          dark: "#005bb5",
        },
        accent: {
          light: "#ffe6a7",
          medium: "#ffcf44",
          dark: "#b89400",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      container: {
        center: true,
        padding: "2rem",
      },
    },
  },
  plugins: [],
};
