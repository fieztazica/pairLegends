const { createProxyMiddleware } = require("http-proxy-middleware");

// const context = ["weatherforecast"];

module.exports = function (app) {
  if (
    !(
      process.env.REACT_APP_VERCEL_ENV === "production" ||
      process.env.NODE_ENV === "production"
    )
  )
    app.use(
      "/api",
      createProxyMiddleware({
        target: `https://localhost:5001`,
        secure: false,
      })
    );
};
