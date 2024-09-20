import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://ecommerce-backend-c405q1cfy-naveed-islams-projects-77b7560f.vercel.app",
    },
  },
  optimizeDeps: {
    exclude: ["country-state-picker"],
  },
});
