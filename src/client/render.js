import {
  MAP_SIZE,
  PLAYER
} from "../shared/constants"

import {
  getAsset
} from "./asset"

import {
  getCurrentState
} from './state.js'

import {
  $
} from './util'

const cnv = $('#cnv')
const ctx = cnv.getContext('2d')

function setCanvasSzie() {
  cnv.width = window.innerWidth
  cnv.height = window.innerHeight
}

// 默认设置一次canvas宽高，当屏幕缩放当时候也会设置一次
setCanvasSzie()
window.addEventListener('resize', setCanvasSzie)

// 绘制函数
function render() {
  const {
    me,
    other,
    bullets
  } = getCurrentState()
  if (!me) {
    return
  }

  // 绘制背景圆
  renderBackground(me.x, me.y);
  // 绘制一个边界
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 1;
  // 默认边界左上角在屏幕中心，减去人物的x/y算出相对于人物的偏移
  ctx.strokeRect(cnv.width / 2 - me.x, cnv.height / 2 - me.y, MAP_SIZE, MAP_SIZE)

  // 绘制所有的玩家
  // 第一个参数是对照位置的数据，第二个参数是玩家渲染的数据
  renderPlayer(me, me);
  others.forEach(renderPlayer.bind(null, me));
}

function renderBackground(x, y) {
  // 假设背景圆的位置在屏幕左上角，那么cnv.width/height / 2就会将这个圆定位在屏幕中心
  // MAP_SIZE / 2 - x/y 地图中心与玩家的距离，这段距离就是背景圆圆心正确的位置
  const backgroundX = MAP_SIZE / 2 - x + cnv.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + cnv.height / 2;
  const bgGradient = ctx.createRadialGradient(
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2
  )
  bgGradient.addColorStop(0, 'rgb(100, 216, 89)')
  bgGradient.addColorStop(1, 'rgb(154, 207, 223)')
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, cnv.width, cnv.height)
}


function renderPlayer(me, player) {
  const {
    x,
    y
  } = player;
  // 默认将玩家渲染在屏幕中心，然后将位置设置上去，再计算相对于自己的相对位置，就是正确在屏幕的位置了
  const canvasX = cnv.width / 2 + x - me.x;
  const canvasY = cnv.height / 2 + y - me.y;

  ctx.save();
  ctx.translate(canvasX, canvasY);
  ctx.drawImage(
    getAsset('ball.svg'),
    -PLAYER.RADUIS,
    -PLAYER.RADUIS,
    PLAYER.RADUIS * 2,
    PLAYER.RADUIS * 2
  )
  ctx.restore();

  // 绘制血条背景
  ctx.fillStyle = 'white'
  ctx.fillRect(
    canvasX - PLAYER.RADUIS,
    canvasY - PLAYER.RADUIS - 8,
    PLAYER.RADUIS * 2,
    4
  )

  // 绘制血条
  ctx.fillStyle = 'red'
  ctx.fillRect(
    canvasX - PLAYER.RADUIS,
    canvasY - PLAYER.RADUIS - 8,
    PLAYER.RADUIS * 2 * (player.hp / PLAYER.MAX_HP),
    4
  )

  // 绘制玩家的名称
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center';
  ctx.font = "20px '微软雅黑'"
  ctx.fillText(player.username, canvasX, canvasY - PLAYER.RADUIS - 16)

}
// 这里将启动渲染函数的定时器，将其导出，我们在index.js中使用
let renderInterval = null;
export function startRendering() {
  renderInterval = setInterval(render, 1000 / 60);
}

export function stopRendering() {
  ctx.clearRect(0, 0, cnv.width, cnv.height)
  clearInterval(renderInterval);
}