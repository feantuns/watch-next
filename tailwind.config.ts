import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      gray: {
        800: "#212121",
      },
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
