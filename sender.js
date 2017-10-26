const sockets = new Set()

const columns = []
for (let a = 0; a < 50; a++) {
  columns.push({
    key: a
  })
}

const add = (socket) => {
  console.log('add', socket)
  sockets.add(socket)
  socket.emit('grid-columns', columns)
}

const remove = (socket) => {
  console.log('remove', socket)
  sockets.delete(socket)
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
}

function send () {
  const msg = new ArrayBuffer(100 * 50 * 4)
  const view = new Int32Array(msg)
  const cellsCount = view.length
  for (let i = 0; i < cellsCount; i++) {
    view[i] = getRandomInt(10, 31000)
  }
  for (const socket of sockets) {
    socket.emit('grid-data', msg)
  }
  setTimeout(send, 16)
}

send()

module.exports = {
  add,
  remove
}
