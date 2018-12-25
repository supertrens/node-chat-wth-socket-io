const socket = io();

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('reconnect', function() {
  console.log('You are back to the game');
});

socket.on('newMessage', function(msg) {
  const formatedTime = moment(msg.createdAt).format('h:mm a')
  const newList = $('<li>').text(`${msg.from} ${formatedTime}: ${msg.text}`);
  $('#messages').append(newList);
});

socket.on('newLocationMessage', function(msg){
  const formatedTime = moment(msg.createdAt).format('h:mm a')
  const locationLink = $(`<a target= "_blank"> My Current Location </a>`).attr('href', msg.url)
  const newList = $('<li>').text(`${msg.from} ${formatedTime}: `).append(locationLink);
  $('#messages').append(newList);

})

socket.on('newUser', function(msg) {
  console.log(msg);
});

$('#message-form').on('submit', function(event) {
  event.preventDefault();

  const messageTextbox = $('#textMessage');
  const text = messageTextbox.val();

  socket.emit('createMessage', { from: 'User', text }, function() {
    messageTextbox.val('');
  });
});

const locationButton = $('#send-location');

locationButton.on('click', function() {
  if (!'geolocation' in navigator) {
    return alert('Geolocation not supported on your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...')

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr('disabled').text('Send Location');

      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to share your location');
    }
  );
});
