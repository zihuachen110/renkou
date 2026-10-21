/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAFA",
        surface: "#FFFFFF",
        ink: "#18181B",
        muted: "#71717A",
        line: "#E4E4E7",
        accent: "#0E7490",
        "accent-soft": "#ECFEFF",
        "map-low": "#A5F3FC",
        "map-high": "#155E75",
      },
      fontFamily: {
        sans: ['"Fira Sans"', "system-ui", "sans-serif"],
        mono: ['"Fira Code"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1120px",
      },
      borderRadius: {
        DEFAULT: "2px",
      },
    },
  },
  plugins: [],
};
