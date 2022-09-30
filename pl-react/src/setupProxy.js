const { createProxyMiddleware } = require('http-proxy-middleware')

const context = ['/weatherforecast']

module.exports = function (app) {
  app.use(
    createProxyMiddleware(context, {
      target: `${process.env.API_HOST}`,
      secure: false,
      changeOrigin: true,
      router: {
        // when request.headers.host == 'dev.localhost:3000',
        // override target 'http://www.example.org' to 'http://localhost:8000'
        'dev.localhost:3000': 'http://localhost:5001'
      }
    })
  )
}
