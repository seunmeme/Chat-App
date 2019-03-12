const socket = io();

socket.on('connect', () => {
    console.log('Connected to the server');

    socket.emit('createEmail', {
        to: 'seun@example.com',
        message: 'Hey, this is Meme.'
    });

    socket.emit('createMessage', {
        from: 'seun@example.com',
        message: 'Hey, Check this out!'
    });
});

socket.on('newEmail', (email) => {
    console.log('New Email', email);
});

socket.on('newMessage', (message) => {
    console.log('Message received', message);
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});

