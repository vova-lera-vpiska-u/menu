module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['node'],
    extends: ['plugin:node/recommended'],
    rules: {
        'no-unused-vars': 'warn',
        'no-console': 'off',
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
        'prettier/prettier': 'off',
        'no-eval': 'off',
        'no-undef': 'error',
    },
    ignorePatterns: ['node_modules/', 'dist/'],
}
