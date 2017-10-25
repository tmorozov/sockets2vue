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

function send () {
  const msg = new ArrayBuffer(100 * 50 * 4)
  const view = new Int32Array(msg)
  const cellsCount = view.length
  for (let i = 0; i < cellsCount; i++) {
    view[i] = ~(Math.random() * 1000)
  }
  for (const socket of sockets) {
    socket.emit('grid-data', msg)
  }
  setTimeout(send, 500)
}

setTimeout(send, 1)

module.exports = {
  add,
  remove
}
