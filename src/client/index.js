// src/servers/server.js
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const webpackConfig = require('../../webpack.dev')
// 前端静态文件
const app = express();
app.use(express.static('public'))

if (process.env.NODE_ENV === 'development') {
  // 这里是开发模式
  // 这里使用了webpack-dev-middleware的中间件，作用就是代码改动就使用webpack.dev的配置进行打包文件
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // 上线环境就只需要展示打包后的文件夹
  app.use(express.static('dist'))
}