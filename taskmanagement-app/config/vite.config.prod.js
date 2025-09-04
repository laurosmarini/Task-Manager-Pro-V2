import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Production-optimized Vite configuration
// HIVE-OPTIMIZER-DELTA Build Optimization

export default defineConfig({
  plugins: [
    react({
      // Production optimizations
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-remove-prop-types', { removeImport: true }]
        ]
      }
    })
  ],
  
  // Build optimizations
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable source maps for production
    minify: 'terser',
    target: 'es2020',
    
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
          utils: ['date-fns']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    
    // Terser options for better compression
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: {
        safari10: true
      }
    },
    
    // Performance budgets
    chunkSizeWarningLimit: 600,
    
    // Asset optimization
    assetsInlineLimit: 4096 // Inline assets smaller than 4KB
  },
  
  // Production server config
  server: {
    port: 3000,
    host: true,
    strictPort: true
  },
  
  // Preview server for production builds
  preview: {
    port: 4173,
    host: true,
    strictPort: true
  },
  
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      '@components': resolve(__dirname, '../src/components'),
      '@pages': resolve(__dirname, '../src/pages'),
      '@hooks': resolve(__dirname, '../src/hooks'),
      '@utils': resolve(__dirname, '../src/utils'),
      '@styles': resolve(__dirname, '../src/styles')
    }
  },
  
  // CSS optimization
  css: {
    devSourcemap: false,
    modules: {
      generateScopedName: '[hash:base64:5]'
    }
  }
});