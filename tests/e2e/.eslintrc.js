module.exports = {
  plugins: ['cypress'],
  env: {
    mocha: true,
    'cypress/globals': true,
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
  },
  parserOptions: {
    ecmaVersion: 6,
  },
}
