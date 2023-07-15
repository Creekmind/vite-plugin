import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: ['/src/client/main.tsx', '/src/client/client.ts'],
    },
  },
  server: {
    cors: false,
    origin: 'http://127.0.0.1:3000'
  }
});
