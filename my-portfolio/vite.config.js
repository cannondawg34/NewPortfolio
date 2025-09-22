import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use base only in production so dev stays at http://localhost:5173/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/NewPortfolio/' : '/',
}))