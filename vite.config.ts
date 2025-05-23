import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
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
    ],
    define: {
        'import.meta.env.VITE_APP_VERSION': JSON.stringify(version),
    },
}))
