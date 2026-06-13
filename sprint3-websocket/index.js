const express = require('express')

const app = express()

const http = require('http').createServer(app)

const io = require('socket.io')(http)

const PORT = 3000

const messages = []

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/index.html')
})

app.use(express.static(__dirname + '/assets'))

io.on('connection', (socket) => {

  console.log('user connected')

  // send old messages
  socket.emit('previous messages', messages)

  // new message
  socket.on('chat message', (data) => {

    const message = {
      id: Date.now().toString(),
      name: data.name,
      message: data.message,
      likes: 0,
      dislikes: 0
    }

    messages.push(message)

    io.emit('chat message', message)
  })

  // LIKE
  socket.on('like message', (id) => {

    const message = messages.find((msg) => msg.id === id)

    if (message) {

      message.likes += 1

      io.emit('update message', message)
    }
  })

  // DISLIKE
  socket.on('dislike message', (id) => {

    const message = messages.find((msg) => msg.id === id)

    if (message) {

      message.dislikes += 1

      io.emit('update message', message)
    }
  })

  socket.on('disconnect', () => {

    console.log('user disconnected')
  })
})

http.listen(PORT, () => {

  console.log(`server started on port ${PORT}`)
})