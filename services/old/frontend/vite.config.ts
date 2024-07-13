import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  // root: 'index.html',
  server: {
    port: 8080,
    host: '0.0.0.0', // Set host to 0.0.0.0 to allow access from outside the container
    open: false, // Disable auto-opening of the browser
  },
  build: {
    rollupOptions: {
        input: './index.html'
    }
  },
  preview: {
    port: 8080,
     host: '127.0.0.1',
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: './',
});