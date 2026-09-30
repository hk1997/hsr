import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/thyroid-summit-2026/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        program: resolve(__dirname, 'program.html'),
        register: resolve(__dirname, 'register.html')
      }
    }
  }
})
