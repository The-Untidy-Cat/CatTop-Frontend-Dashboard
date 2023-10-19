/** @type {import('tailwindcss').Config} */
const theme = require("./theme/theme.config");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: theme.color.primary,
        secondary: theme.color.secondary,
        success: theme.color.success,
        warning: theme.color.warning,
        error: theme.color.error,
        info: theme.color.info,
        "text-base": theme.color.textBase,
        bgBase: theme.color.bgBase,
        white: theme.color.white,
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    outlineWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
  },
  plugins: [],
};
