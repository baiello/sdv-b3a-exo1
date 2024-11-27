import { defineConfig } from "vite";

export default defineConfig({
    base: '/sdv-b3a-exo1/',
    build: {
        rollupOptions: {
            input: {
                index: 'index.html',
                resto: 'restaurant.html',
            }
        }
    },
    server: {
        host: "0.0.0.0",
        port: 5173,
    },
    test: {
        globals: true
    },
});
