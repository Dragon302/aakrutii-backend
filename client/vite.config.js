import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This forwards API calls to your backend
      '/api': {
        target: 'https://aakrutii-backend.onrender.com',
        changeOrigin: true,
      },
      // 🚀 THIS IS THE MISSING LINK! 
      // It forwards file requests to your backend
      '/uploads': {
        target: 'https://aakrutii-backend.onrender.com',
        changeOrigin: true,
      }
    }
  }
})