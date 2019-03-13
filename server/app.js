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

    socket.on('createMessage', (message) => {
        console.log('Message created', message);
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.emit('newMessage',  {
        from: 'Admin',
        message: 'Welcome onboard!',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined.',
        createdAt: new Date().getTime()
    })
   

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});


server.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});