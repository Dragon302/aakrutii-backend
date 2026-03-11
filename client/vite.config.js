import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // This stops the warning from showing up
    chunkSizeWarningLimit: 1600, 
    rollupOptions: {
      output: {
        // This splits your code into smaller, faster chunks!
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})