import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  build: {
    target: 'es2020',
    minify: 'oxc',
    sourcemap: false,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
        if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor-react'
        if (id.includes('node_modules/framer-motion')) return 'vendor-motion'
        if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons')) return 'vendor-icons'
      },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
})
