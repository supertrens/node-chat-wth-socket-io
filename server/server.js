const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  socket.on('createMessage' , (msg={}) => {
    io.emit('newMessage' , {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getDate()
    });

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
