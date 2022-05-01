import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ _, mode }) => {
  const config = {
    build: {},
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
        'api': '/src/api', // using @ to represent /src will cause hmr fail
        'common': '/src/common',
        'components': '/src/components',
        'pages': '/src/pages',
        'router': '/src/router',
        'store': '/src/store',
      }
    },
    envDir: 'environments',
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    server: {
      open: 'http://localhost:3000/',
      proxy: {
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/fallback/, '')
        }
      }
    },
  }
  if (mode === 'production') {
    config.build.minify = 'esbuild' // resolve Redux console error
  } else {
    config.build.minify = false
  }
  return config
})