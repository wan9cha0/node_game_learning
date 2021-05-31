// core/socket.js
const Constants = require('../../shared/constants')

class Socket {
  constructor(game, io) {
    this.game = game;
    this.io = io;
  }

  listen() {
    // 玩家成功连接socket服务
    console.log(`Player connected! Socket Id: ${socket.id}`)
  }
}

module.exports = Socket