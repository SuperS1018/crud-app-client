const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function(app) {
    app.use('/api', createProxyMiddleware(
        {
            target: process.env.PROXY_BASEURL,
            changeOrigin: true
        }
    ))
};