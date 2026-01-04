import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@context': path.resolve(__dirname, './src/context'),
      '@config': path.resolve(__dirname, './src/config'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps for production builds
    chunkSizeWarningLimit: 1000, // Increase limit for larger projects
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const module = id.split('node_modules/').pop().split('/')[0];
            // Group core libraries into a separate chunk for better caching
            if (['react', 'react-dom', 'react-router-dom', 'axios', 'framer-motion', 'lucide-react'].includes(module)) {
              return 'vendor-core';
            }
            // Group other node_modules into a general vendor chunk
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});