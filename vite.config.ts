import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relatif agar hasil build bisa di-host dari subfolder / tema WordPress.
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    // Manifest untuk memudahkan enqueue aset hashed di tema/plugin WordPress.
    manifest: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
