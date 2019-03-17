import path from 'path';
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

import { generateMessage, generateLocationMessage } from './utils/message';
import { isRealString } from './utils/validation'

const publicPath = path.join(__dirname, './../public' );
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected'); 


    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        }

        socket.join(params.room);

        socket.emit('newMessage',  generateMessage('Admin', 'Welcome to our chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback();
    })

    socket.on('createMessage', (message, callback) => {
        console.log('Message created', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback(); 
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});


server.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});