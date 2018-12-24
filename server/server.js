const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const {
  CREATE_MESSAGE,
  NEW_MESSAGE,
  CREATE_LOCATION_MESSAGE,
  NEW_LOCATION_MESSAGE
} = require('./constant/constant');

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

  socket.on(CREATE_MESSAGE, (msg = {}, callback) => {
    console.log('Create Message ', msg);
    io.emit(NEW_MESSAGE, generateMessage(msg.from, msg.text));
    callback('This is from the server'); //acknowledge that we have received the emit
  });

  socket.on(CREATE_LOCATION_MESSAGE, coords => {
    io.emit(
      NEW_LOCATION_MESSAGE,
      generateLocationMessage('Admin', coords.latitude, coords.longitude)
    );
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
