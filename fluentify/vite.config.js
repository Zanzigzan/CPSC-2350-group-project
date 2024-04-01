import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', //add jsdom to vite
    globals: true, //add globals to vite
    setupFiles: './src/integ-tests/setup.js' //add setup file to vite
  }
})