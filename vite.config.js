import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/assets/js/thincalc.js'),
      },
      output: {
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    cors: true,
    open: false,
  },
  optimizeDeps: {
    include: ['alpinejs'],
  },
});
