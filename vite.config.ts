import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/lead': {
        target: 'http://89.117.18.118:8080',
        changeOrigin: true,
        rewrite: () => '/submit',
      },
      '/api/submit': {
        target: 'http://89.117.18.118:8080',
        changeOrigin: true,
        rewrite: () => '/submit',
      },
    },
  },
})
