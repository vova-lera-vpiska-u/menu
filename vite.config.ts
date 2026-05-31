import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    base: '/menu/',
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
        tsconfigPaths(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            pwaAssets: {
                image: 'public/icon.svg',
                preset: 'minimal-2023',
            },
            manifest: {
                name: 'Delicious Menu',
                short_name: 'Menu',
                description: 'A menu for delicious dishes.',
                lang: 'ru',
                id: '/menu/',
                display: 'standalone',
                background_color: '#242424',
                theme_color: '#242424',
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2,ttf,otf}'],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
            },
            devOptions: {
                enabled: true,
            },
        }),
    ],
    define: {
        'import.meta.env.VITE_APP_VERSION': JSON.stringify(version),
    },
}))
