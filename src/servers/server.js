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