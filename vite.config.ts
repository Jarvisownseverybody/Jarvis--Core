import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages base — set to repo name so assets resolve under /Jarvis--Core/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: env.VITE_BASE ?? "/Jarvis--Core/",
    build: {
      target: "es2020",
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            motion: ["framer-motion"],
            gsap: ["gsap"],
            hls: ["hls.js"],
          },
        },
      },
    },
  };
});
