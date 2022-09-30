const {createProxyMiddleware} = require("http-proxy-middleware");

const context = ["weatherforecast"];

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        target: `${process.env.API_HOST}`,
        secure: false,
        changeOrigin: true,
        router: {
            'localhost:3000/api': 'https://localhost:5001',
        },
    }));
};
