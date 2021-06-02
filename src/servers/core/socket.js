// core/socket.js
const Constants = require('../../shared/constants')

class Socket {
  constructor(game, io) {
    this.game = game;
    this.io = io;
  }

  listen(socket) {
    // 玩家成功连接socket服务
    console.log(`Player connected! Socket Id: ${Socket.id}`)
    // 加入游戏
    socket.on(Constants.MSG_TYPES.JOIN_GAME, this.game.joinGame.bind(this.game, socket));
    // 断开游戏
    socket.on('disconnect', this.game.disconnect.bind(this.game, socket));
  }
}

module.exports = Socket