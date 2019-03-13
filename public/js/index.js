const socket = io();

socket.on('connect', () => {
    console.log('Connected to the server');

    socket.emit('createMessage', {
        from: 'seun@example.com',
        message: 'Hey, Check this out!'
    });
});



socket.on('newMessage', (message) => {
    console.log('Message received', message);

    let li = $('<li><li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
})