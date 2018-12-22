const socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('reconnect' , function() {
  console.log('You are back to the game');
});

socket.on('newMessage' , function(msg){
  console.log('New message has been emit', msg);
});
