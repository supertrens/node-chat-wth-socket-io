const socket = io();

function scrollToBottom() {
  // selectors
  const messages = $('#messages');
  const newMessage = messages.children('li:last-child');

  // Heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('reconnect', function() {
  console.log('You are back to the game');
});

socket.on('newMessage', function(msg) {
  const formatedTime = moment(msg.createdAt).format('h:mm a');
  const template = $('#message-template').html();

  Mustache.parse(template); // optional, speeds up future uses

  const rendered = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formatedTime
  });

  $('#messages').append(rendered);

  scrollToBottom();
});

socket.on('newLocationMessage', function(msg) {
  const formatedTime = moment(msg.createdAt).format('h:mm a');
  const template = $('#location-message-template').html();

  Mustache.parse(template); // optional, speeds up future uses

  const rendered = Mustache.render(template, {
    url: msg.url,
    from: msg.from,
    createdAt: formatedTime
  });

  $('#messages').append(rendered);
  scrollToBottom();
});

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

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

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
