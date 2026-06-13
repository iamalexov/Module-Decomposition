const socket = io()

const messages = document.querySelector('.messages')

const form = document.querySelector('.form')

const input = document.querySelector('.input')

const nameBlock = document.querySelector('.name')

const userName = prompt('Your name:')

nameBlock.textContent = userName

// render all old messages
socket.on('previous messages', (messagesData) => {

  messages.innerHTML = ''

  messagesData.forEach((message) => {
    createMessage(message)
  })
})

// send new message
form.addEventListener('submit', (e) => {

  e.preventDefault()

  if (input.value.trim()) {

    socket.emit('chat message', {
      name: userName,
      message: input.value
    })

    input.value = ''
  }
})

// receive new message
socket.on('chat message', (message) => {

  createMessage(message)
})

// receive updated reactions
socket.on('update message', (updatedMessage) => {

  const item = document.getElementById(updatedMessage.id)

  if (!item) return

  const likeCount = item.querySelector('.like-count')

  const dislikeCount = item.querySelector('.dislike-count')

  likeCount.textContent = updatedMessage.likes

  dislikeCount.textContent = updatedMessage.dislikes
})

// create message element
function createMessage(data) {

  const item = document.createElement('li')

  item.id = data.id

  item.innerHTML = `
  
    <div class="message-content">
      <span>${data.name}</span>: ${data.message}
    </div>

    <div class="reactions">

      <button class="like-btn">
        👍 <span class="like-count">${data.likes}</span>
      </button>

      <button class="dislike-btn">
        👎 <span class="dislike-count">${data.dislikes}</span>
      </button>

    </div>
  `

  const likeBtn = item.querySelector('.like-btn')

  const dislikeBtn = item.querySelector('.dislike-btn')

  // like
  likeBtn.addEventListener('click', () => {

    socket.emit('like message', data.id)
  })

  // dislike
  dislikeBtn.addEventListener('click', () => {

    socket.emit('dislike message', data.id)
  })

  messages.appendChild(item)
}