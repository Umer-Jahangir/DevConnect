import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import lingoCompiler from "lingo.dev/compiler";

export default defineConfig(() =>
  lingoCompiler.vite({
    sourceRoot: "src", // your React source folder
    targetLocales: ["ur", "hi", "es", "ar"], // target languages
    models: "lingo.dev", // use Lingo.dev AI engine
  })({
    plugins: [react(), tailwindcss()],
    build: {
      outDir: "dist", // Vercel expects your build output here
    },
    server: {
      port: 5173,
      open: true,
    },
  })
);
