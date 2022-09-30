const { createProxyMiddleware } = require('http-proxy-middleware')

const context = ['/weatherforecast']

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: 'https://localhost:5001',
    secure: false,
    changeOrigin: true,
    logger: console
  })

  app.use(appProxy)
}
