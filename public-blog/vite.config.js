import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxies /api/* to your Express server, so you don't need CORS in development.
export default defineConfig({
  plugins: [react()],
  server: {
  proxy: {
    "/api": { target: "http://localhost:8080", rewrite: (p) => p.replace(/^\/api/, "") },
  },
},
});
