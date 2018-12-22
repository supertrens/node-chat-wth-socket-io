const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
const { NEW_MESSAGE, CREATE_MESSAGE } = require('./constant/constant');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  socket.emit(NEW_MESSAGE, generateMessage('Admin', 'Welcome to our chat app'));

  socket.broadcast.emit(
    NEW_MESSAGE,
    generateMessage('Admin', 'New user has joined the chat room')
  );

  socket.on(CREATE_MESSAGE, (msg = {}) => {
    io.emit(NEW_MESSAGE, generateMessage(msg.from, msg.text));

    // socket.broadcast.emit('newMessage', {
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date().getDate()
    // });
  });

  socket.on('disconnect', () => {
    console.log('One user got disconnected');
  });
});

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
