import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()] as any,
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true // cấu hình source map css
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
