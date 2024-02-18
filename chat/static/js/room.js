const roomName = JSON.parse(document.getElementById('room-name').textContent)
const chatLog = document.querySelector('#chat-log')
const chatContainer = document.querySelector('.chat-container')

if (!chatLog.hasChildNodes()) {
  const emaptyText = document.createElement('h2')
  emaptyText.className = 'empty-text'
  emaptyText.id = 'emptyText'
  emaptyText.innerText = 'No Message'
  chatLog.appendChild(emaptyText)
}
const chatSocket = new WebSocket(
  'ws://' + window.location.host + '/ws/chat/' + roomName + '/'
)

chatSocket.onmessage = function (e) {
  const data = JSON.parse(e.data)
  const userId = data.user_id
  const LoggedInUserId = JSON.parse(
    document.getElementById('user_id').textContent
  )
  const messageElement = document.createElement('div')
  messageElement.innerText = data.message
  console.log(LoggedInUserId)
  if (userId === LoggedInUserId) {
    messageElement.classList.add('message', 'sender')
  } else {
    messageElement.classList.add('message', 'reciver')
  }
  chatLog.appendChild(messageElement)

  if (document.querySelector('#emptyText')) {
    document.querySelector('#emptyText').remove()
  }
}

chatSocket.onclose = function (e) {
  console.error('Chat socket closed unexpectedly')
}

document.querySelector('#chat-message-input').focus()
document.querySelector('#chat-message-input').onkeyup = function (e) {
  if (e.key === 'Enter') {
    // enter, return
    document.querySelector('#chat-message-submit').click()
  }
}

document.querySelector('#chat-message-submit').onclick = function (e) {
  const messageInputDom = document.querySelector('#chat-message-input')
  const message = messageInputDom.value
  chatSocket.send(
    JSON.stringify({
      message: message
    })
  )
  messageInputDom.value = ''
}




