import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3002,
    proxy: {
      '/api/v1': 'http://localhost:8002'
    }
  }
});
