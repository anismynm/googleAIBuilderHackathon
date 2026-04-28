const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api-proxy',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/ws-proxy',
    createProxyMiddleware({
      target: 'ws://localhost:5000',
      ws: true,
      changeOrigin: true,
    })
  );
};
