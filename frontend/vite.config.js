import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist", // Vercel expects your build output here
  },
  server: {
    port: 5173,
    open: true,
  },
});
