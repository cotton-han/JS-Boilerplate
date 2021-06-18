module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'eslint-config-prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        bracketSpacing: true,
        tabWidth: 2,
        semi: true,
        printWidth: 80,
        singleQuote: true,
      },
    ],
    'no-unused-vars': 'warn',
    'no-var': 'warn',
  },
};
