import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'

import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    base: '/menu/',
    resolve: {
        alias: {
            '@': '/src',
            '@app': '/src/app',
            '@pages': '/src/pages',
            '@widgets': '/src/widgets',
            '@features': '/src/features',
            '@entities': '/src/entities',
            '@shared': '/src/shared',
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
    define: {
        'import.meta.env.VITE_APP_VERSION': JSON.stringify(version),
    },
}))
