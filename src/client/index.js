import {
  connect,
  play
} from "./networking"
import {
  $
} from "./util"
import './css/bootstrap-reboot.min.css'
import './css/common.css'
Promise.all([connect()]).then(() => {

  console.log('1231')
  // 隐藏连接服务器显示输入框及按键
  $('.connect').classList.add('hidden')
  $('.play').classList.remove('hidden')

  // 默认聚焦输入框
  $('#home input').focus()

  // 游戏开始按钮监听点击时间

  $('#play-button').onclick = () => {
    let val = $('#home input').value
    if (val.replace(/\s*/g, '') === '') {
      alert('名称不能为空！')
      return
    }
    // 游戏开始
    $('#home').classList.add('hidden')
    play(val)
  }

}).catch(console.error)