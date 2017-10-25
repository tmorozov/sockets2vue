
const path = require('path')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const sender = require('./sender')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected')
  sender.add(socket)

  socket.on('disconnect', () => {
    console.log('user disconnected')
    sender.remove(socket)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
