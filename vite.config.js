import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Proxy all requests starting with /encrypt-decrypt ke API luar
      '/encrypt-decrypt': {
        target: 'https://go-encrypt-decrypt-aes.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
