const socket = io();

// socket.on('connect', function() {
//   console.log('Connected to server');
// });

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('reconnect', function() {
  console.log('You are back to the game');
});

socket.on('newMessage', function(msg) {
  const newList = $('<li>').text(`${msg.from}: ${msg.text}`);
  $('.message').append(newList);
});

socket.on('newUser', function(msg) {
  console.log(msg);
});

$('#message-form').on('submit', function(event) {
  event.preventDefault();

  const from = $('#from').val();
  const text = $('#textMessage').val();

  socket.emit('createMessage', { from, text }, function(data) {});
});
