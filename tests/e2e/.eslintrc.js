module.exports = {
  plugins: ['cypress'],
  env: {
    mocha: true,
    'cypress/globals': true,
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'max-len': 120,
  },
  parserOptions: {
    ecmaVersion: 6,
  },
}
