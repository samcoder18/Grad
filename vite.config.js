import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // GitHub Pages serves the site from /Grad/
  base: "/Grad/",
  plugins: [react(), tailwindcss()],
});
