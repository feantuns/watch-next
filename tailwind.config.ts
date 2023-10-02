import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          800: "#212121",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
