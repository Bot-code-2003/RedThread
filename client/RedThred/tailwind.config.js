/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        post: {
          light: "#f3f4f6", // Light gray
          medium: "#e5e7eb", // Default gray
          dark: "#9ca3af", // Dark gray
          darker: "#6b7280", // Darker gray
        },
        primary: {
          light: "#ff7c7c", // Light red
          medium: "#ff4949", // Default red
          dark: "#b80000", // Dark red
        },
        secondary: {
          light: "#6ab0f3", // Light blue
          medium: "#468ed1", // Default blue
          dark: "#005bb5", // Dark blue
        },
        accent: {
          light: "#ffe6a7", // Light yellow
          medium: "#ffcf44", // Default yellow
          dark: "#b89400", // Dark yellow
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
