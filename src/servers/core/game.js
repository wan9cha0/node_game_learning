// core/game.js
class Game {
  constructor() {
    // 保存玩家的socket信息
    this.sockets = {}
    // 保存玩家的游戏对象信息
    this.players = {};
    // 子弹
    this.bullets = [];
    // 最后一次执行时间
    this.lastUpdateTime = Date.now();
    // 是否发送给前端数据，这里将每两帧发送一次数据
    this.shouldSendUpdate = false;
    // 游戏更新
    setInterval(this.update.bind(this), 1000 / 60);
  }

  update() {

  }

  // 玩家加入游戏
  joinGame() {

  }

  // 玩家断开游戏
  disconnect() {

  }
}

module.exports = Game;