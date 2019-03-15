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
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });

    $('#messages').append(html);
  });

  socket.on('newLocationMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime
    });

    $('#messages').append(html);
    // let li = $('<li></li>');
    // let a = $('<a target="_blank">My current location</a>');
  
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // $('#messages').append(li);
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