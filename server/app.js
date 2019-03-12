import path from 'path';
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

const publicPath = path.join(__dirname, './../public' );
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newEmail',  {
        from: 'sol@example.com',
        message: 'Hello there!',
        createdAt: 6000
    })

    socket.emit('newMessage',  {
        from: 'Seun',
        message: 'Hey my people!',
        createdAt: 6000
    })

    socket.on('createEmail', (newEmail) => {
        console.log('Email created', newEmail);
    });

    socket.on('createMessage', (newMessage) => {
        console.log('Message created', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});


server.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});