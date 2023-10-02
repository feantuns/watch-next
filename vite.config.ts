import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 3000,
  },
  base: "/watch-next/",
  plugins: [
    svgr({
      exportAsDefault: true,
    }),
    react(),
  ],
});
