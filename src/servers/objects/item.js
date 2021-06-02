class Item {
  constructor(data = {}) {
    this.id = data.id
    this.x = data.x
    this.y = data.y
    this.w = data.w
    this.h = data.h
  }

  // 物体每帧的运动状态
  update(dt) {

  }
  // 格式化数据以方便发送数据给前端
  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h
    }
  }
}

module.exports = Item