const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  socket.emit('newMessage', {
    from: 'Pitrens',
    text: 'I am getting good at it',
    createdAt: 123
  });

  socket.on('createMessage' , (msg={}) => {
    msg.createdAt = 123;
    console.log('message created ' , msg);
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
