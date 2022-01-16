
// npm install  express  http-proxy-middleware --save-dev
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// proxy middleware options
const options = {
  target: 'http://97pgnp.natappfree.cc', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {'^/api' : '/'}
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);

// mount `exampleProxy` in web server
const app = express();
app.all('*', function (req, res, next) {    // 解决跨域问题
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");    
    if (req.method == "OPTIONS") {
        res.send(200);       
    } else {
        next();
    }
});
app.use(express.static(__dirname));
app.use('/api', exampleProxy);
app.listen(3000);