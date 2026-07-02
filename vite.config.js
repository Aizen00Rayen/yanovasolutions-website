import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The built SPA is emitted to /dist and served by the Express server in production.
// In development, Vite runs on 5173 and proxies /api to the Express server on 3000.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
