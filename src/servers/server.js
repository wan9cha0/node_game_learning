const express = require('express')
const socketio = require('socket.io')
const app = express()

const Socket = require('./core/socket')
const Game = require('./core/game')

const port = process.env.PORT || 3210
const server = app.listen(3210, _ => {
  console.log(`Server Listening on port:${port}`)
})

const game = new Game

const io = socketio(server)

const socket = new Socket(game, io)

io.on('connect', item => {
  socket.listen(item)
})

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const webpackConfig = require('../../webpack.dev')
// 前端静态文件
// const app = express();
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