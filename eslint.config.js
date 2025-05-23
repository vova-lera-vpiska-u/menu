import eslintRecommended from '@eslint/js'
import parser from '@typescript-eslint/parser'
import effectorPlugin from 'eslint-plugin-effector'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default [
    eslintRecommended.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        ignores: ['dist/**', 'node_modules/**'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            parser,
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
            },
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            effector: effectorPlugin,
        },
        rules: {
            'no-console': 'warn',
            'no-eval': 'off',
            'react/jsx-key': 'error',
            'react/jsx-uses-react': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
]
