// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@mock': path.resolve(__dirname, 'mock'),
      },
    },
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        logLevel: 'debug',
      },
    },
  },
}
