module.exports = {
  plugins: ['cypress'],
  env: {
    mocha: true,
    'cypress/globals': true,
  },
  rules: {
    strict: 'off',
    '@typescript-eslint/no-var-requires': 0,
  },
  parserOptions: {
    ecmaVersion: 6,
  },
}
