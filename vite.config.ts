import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/SUP_CM/',
  build: {
    outDir: 'public',
    assetsDir: 'assets'
  }
})