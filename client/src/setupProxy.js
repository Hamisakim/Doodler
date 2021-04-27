const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', { target: 'https://sei-doodle-server.herokuapp.com/api' }))
}

//* _______Original_____
// module.exports = function (app) {
//   app.use(createProxyMiddleware('/api', { target: 'http://localhost:4000' }))
// }
//*-------------------//