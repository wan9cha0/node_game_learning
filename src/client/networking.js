import io from "socket.io-client"
import Constants from "../shared/constants"
import {
  processGameUpdate
} from "./state"

// 判断是否是https选择wss http选择ws
const socketProtocal = (window.location.protocol.includes('https') ? 'wss' : 'ws');
// 连接并且补充锌连接，这样可以制作一个断开连接的功能
const socket = io(`${socketProtocal}://${window.location.host}`, {
  reconnection: false
})

const connectPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!')
  })
  resolve()
})
export const connect = onGameOver => {
  connectPromise.then(() => {
    socket.on(Constants.MSG_TYPES.UPDATE, processGameUpdate);
    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
    })
  })
}

export const play = username => {
  socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
}