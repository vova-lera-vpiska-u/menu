import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/menu/',
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@assets': '/src/assets',
    },
  },
  plugins: [
    babel(),
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: mode === 'development' ? true : false,
            },
          ],
        ],
      },
    }),
  ],
}))
