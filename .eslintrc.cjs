module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'effector'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:effector/recommended',
    'plugin:effector/future',
    'plugin:effector/react',
    'plugin:effector/patronum',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'effector/strict-effect-handlers': ['warn'],
    'no-console': 'warn',
    'react-hooks/exhaustive-deps': 'off',
  },
}
