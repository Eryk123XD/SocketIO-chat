const socket = io('http://localhost:3000');
const messageBox = document.getElementById('message-box');
const messageForm = document.getElementById('message-form');
const inputField = document.getElementById('message');

const appendMessage = (message) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageBox.append(messageElement)
}


const name = prompt('Podaj nick...')
appendMessage('Dołączyłeś');

socket.emit('new-user',name)

socket.on('chat-message',data => {
    appendMessage(`${data.nick}:${data.message}`)
})

socket.on('new-user-connected',data => {
    appendMessage(`${data.nick} joined`)
})



messageForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const message = inputField.value;
    socket.emit('send-chat-message',message) //wysyła wartość pod tagiem send-chat-message
    appendMessage(`${name}:${message}`)
    message.value = '';
})

