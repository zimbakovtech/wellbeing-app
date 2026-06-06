import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (wellbeing.zimbakov.dev) serves from root, so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    // Split heavy vendors into their own long-cacheable chunks.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
