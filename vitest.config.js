import dotenv from 'dotenv';
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  }
});
