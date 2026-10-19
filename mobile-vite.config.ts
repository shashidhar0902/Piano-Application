import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: ".",
  base: "./",
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: "mobile-web",
    emptyOutDir: true,
    rollupOptions: {
      input: "index.html",
    },
  },
  plugins: [tailwindcss(), viteReact()],
});
