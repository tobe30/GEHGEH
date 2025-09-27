import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // allows external access
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "e3918328fa22.ngrok-free.app" // <--- add your ngrok domain here
    ]
  }
})
