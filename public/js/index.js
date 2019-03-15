const socket = io();

const messageTextbox = $('[name=message]');
const locationButton = $('#send-location');

socket.on('connect', () => {
    console.log('Connected to server');
  });
  
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
  
  socket.on('newMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
  
    $('#messages').append(li);
  });

  socket.on('newLocationMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
  
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
  });
  
  $('#message-form').on('submit', function (e) {
    e.preventDefault();
  
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val()
    }, function () {
      messageTextbox.val('')
    });
  });

  locationButton.on('click', () => {
      if(!navigator.geolocation){
          return alert('Your browser does not support geolocation')
      }

      locationButton.attr('disabled', 'disabled').text('Sending location...');

      navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
      }, () => {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch your current location!')
      })
  });