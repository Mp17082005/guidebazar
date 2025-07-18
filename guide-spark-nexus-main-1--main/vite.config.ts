import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path"; // Import Node.js path module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Configure the '@' alias to point to the 'src' directory
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080, // Ensure this matches what you expect
  },
});
