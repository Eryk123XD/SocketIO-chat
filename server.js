const io = require('socket.io')(3000);


var users = {};

io.on('connection',socket => {
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message',{message:message,nick:users[socket.id]})
    })
    socket.on('new-user',data => {
        users[socket.id] = data;
        socket.broadcast.emit('new-user-connected',{nick:users[socket.id]})
    })
    socket.on('disconnected', data => {
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users;
    })
})

