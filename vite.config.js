import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://ecommerce-backend-sable-tau.vercel.app",
    },
  },
  optimizeDeps: {
    exclude: ["country-state-picker"],
  },
  resolve: {
    alias: {
      'shadcn-ui': 'shadcn-ui/dist',
    },
  },
});
