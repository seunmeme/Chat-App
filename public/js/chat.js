const socket = io();

const scrollToButtom = () => {
  let messages = $('#messages'),
      newMessage = messages.children('li:last-child');

  let clientHeight = messages.prop('clientHeight'),
      scrollTop = messages.prop('scrollTop'),
      scrollHeight = messages.prop('scrollHeight'),
      newMessageHeight = newMessage.innerHeight(),
      lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
  }
};

const messageTextbox = $('[name=message]');
const locationButton = $('#send-location');

socket.on('connect', () => {
    let params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
      if (err){
        alert(err);
        window.location.href = '/';
      } else {
        console.log('No error');
      }
    });
  });

  socket.on('updateUserList', function(users) {
    let ol = $('<ol></ol>');

    users.forEach(user => {
      ol.append($('<li></li>').text(user))
    });

    $('#users').html(ol);

  });
  
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
  
  socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToButtom();
  });

  socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#location-message-template').html();
    let html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToButtom();
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