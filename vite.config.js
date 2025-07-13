import { defineConfig } from 'vite'
import { resolve } from 'path'
import { glob } from 'glob'
import { fileURLToPath, URL } from 'url'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import injectHTML from 'vite-plugin-html-inject'

const SRC_PATH = './src'
const BLD_PATH = './build'

export default defineConfig({
  root: resolve(__dirname, SRC_PATH),
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, BLD_PATH),
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      input: glob.sync(resolve(__dirname, `${SRC_PATH}/*.html`)),
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name]-chunk.js',
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name ?? '')) {
            return 'css/[name][extname]'
          }
          if (name === 'sprite.svg') {
            return 'img/[name][extname]'
          }
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'assets/img/[name][extname]'
          }

          return 'assets/[name][extname]'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL(resolve(__dirname, SRC_PATH), import.meta.url)),
      vue: 'vue/dist/vue.esm-browser.js',
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [
    injectHTML(),
    ViteImageOptimizer({
      exclude: /\.(webp|avif|svg)$/i,
    }),
  ],
})
