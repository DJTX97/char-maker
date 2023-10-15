import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression()],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Group modules from node_modules into a separate 'vendor' chunk
          }
        },
      },
    },
  },
});
