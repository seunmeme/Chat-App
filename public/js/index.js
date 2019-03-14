const socket = io();

const locationButton = $('#send-location')

socket.on('connect', () => {
    console.log('Connected to server');
  });
  
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
  
  socket.on('newMessage', (message) => {
    console.log('newMessage', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
  
    $('#messages').append(li);
  });

  socket.on('newLocationMessage', (message) => {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
  
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
  });
  
  $('#message-form').on('submit', function (e) {
    e.preventDefault();
  
    socket.emit('createMessage', {
      from: 'User',
      text: $('[name=message]').val()
    }, function () {
  
    });
  });

  locationButton.on('click', () => {
      if(!navigator.geolocation){
          return alert('Your browser does not support geolocation')
      }

      navigator.geolocation.getCurrentPosition((position) => {
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
      }, () => {
          alert('Unable to fetch your current location!')
      })
  });