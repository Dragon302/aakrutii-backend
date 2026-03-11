import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This forwards API calls to your backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      // 🚀 THIS IS THE MISSING LINK! 
      // It forwards file requests to your backend
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})