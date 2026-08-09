import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/medanta/thyroidfna/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Medanta IR Registry',
        short_name: 'MedantaIR',
        description: 'Medanta IR Registry - Thyroid FNA Progressive Web App',
        theme_color: '#0b162c',
        background_color: '#0b162c',
        display: 'standalone'
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  }
});
