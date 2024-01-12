import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/gif/' // replace 'bpa-react' with your repo name
    : '/',
  server:{
    proxy: {
      '/api':{
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      input: 'index.html', // specify the path to your index.html file
    },
  },
  plugins: [react()],
})
