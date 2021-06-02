const Item = require('./item')
const Constants = require('../../shared/constants')


// 玩家对象类
class Player extends Item {
  constructor(data) {
    super(data)

    this.username = data.username
    this.hp = data.hp
    this.speed = data.speed
    //击败分值
    this.score = 0
    // 拥有的buffs 
    this.buffs = []
  }

  update(dt) {

  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      username: this.username,
      hp: this.hp,
      buffs: this.buffs.map(e => {
        e.type
      })
    }
  }
}

module.exports = Player