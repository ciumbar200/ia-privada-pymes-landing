import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
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
