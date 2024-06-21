const { createProxyMiddleware } = require('http-proxy-middleware');
let proxy = {};

const movieProxy = createProxyMiddleware({
    target: 'http://localhost:5000/api/movies', // target host with the same base path
    changeOrigin: true, // needed for virtual hosted sites
});

proxy.movie = movieProxy

module.exports = proxy;