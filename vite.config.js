import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
        privacy: '/privacy.html',
        terms: '/terms.html'
      }
    }
  }
})
