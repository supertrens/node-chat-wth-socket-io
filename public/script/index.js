const socket = io();

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

socket.on('newLocationMessage', function(msg){
  const locationLink = $(`<a target= "_blank"> My Current Location </a>`).attr('href', msg.url)
  const newList = $('<li>').text(`${msg.from}: `).append(locationLink);
  $('.message').append(newList);

})

socket.on('newUser', function(msg) {
  console.log(msg);
});

$('#message-form').on('submit', function(event) {
  event.preventDefault();

  const from = $('#from').val();
  const text = $('#textMessage').val();

  socket.emit('createMessage', { from, text }, function(data) {});
});

const locationButton = $('#send-location');

locationButton.on('click', function() {
  if (!'geolocation' in navigator) {
    return alert('Geolocation not supported on your browser.');
  }

  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      alert('Unable to share your location');
    }
  );
});
