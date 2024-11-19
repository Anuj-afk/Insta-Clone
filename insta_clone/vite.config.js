import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Optional: single file builds
      },
    },
  },
  base: '/Insta-clone/', // Ensure this matches your repository name
});
