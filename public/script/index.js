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

console.log('loading');