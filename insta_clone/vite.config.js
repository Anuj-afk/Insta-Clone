// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: undefined, // Optional: single file builds
//       },
//     },
//   },
//   base: '/Insta-clone/', // Ensure this matches your repository name
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        historyApiFallback: true, // Serves index.html for unknown routes
    },
    build: {
        outDir: 'dist', // Ensure your build output folder is correct
    },
});

