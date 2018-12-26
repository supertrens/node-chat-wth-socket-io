const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const {
  CONNECTION,
  DISCONNECT,
  CREATE_MESSAGE,
  NEW_MESSAGE,
  CREATE_LOCATION_MESSAGE,
  NEW_LOCATION_MESSAGE,
  JOIN,
  UPDATE_USER_LIST
} = require('./constants/index');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

io.on(CONNECTION, socket => {
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

  socket.on(JOIN, (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('fow bay yon non itilizate ak yon konvesasyon');
    }

    socket.join(params.room); // socket.leave ('The chat Room');

    // remove the user for any potential chat room
    users.removeUser(socket.id);
    // save the new user
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit(UPDATE_USER_LIST, users.getUserList(params.room));
    
    socket.emit(
      NEW_MESSAGE,
      generateMessage('Admin', 'Byenvini sou aplikasyon chat sa')
    );

    socket.broadcast
      .to(params.room)
      .emit(
        NEW_MESSAGE,
        generateMessage(
          'Admin',
          `${params.name} rantre nan konvesasyon sou (${params.room})`
        )
      );
    callback();
  });

  socket.on(DISCONNECT, () => {
    const user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit(UPDATE_USER_LIST, user.getUserList(user.room));
      io.to(user.room).emit(NEW_MESSAGE, generateMessage('Admin' , `${user.name} kite konvesasyon an`))
    }
  });
});

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
