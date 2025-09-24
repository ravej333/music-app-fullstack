import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // auto open browser
    fs: {
      strict: false,
    }
  },
  resolve: {
    alias: {
      '@': '/src', // optional shortcut for imports
    },
  }
})
