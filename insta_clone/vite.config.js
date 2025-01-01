import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/Insta-Clone/", 
    server: {
        historyApiFallback: true, // Handles routing for client-side applications
    },// Ensure this matches your repository name
});
