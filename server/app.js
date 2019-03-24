import path from 'path';
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

import { generateMessage, generateLocationMessage } from './utils/message';
import { isRealString } from './utils/validation';
import { Users } from './utils/users';

const publicPath = path.join(__dirname, './../public' );
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');


    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeuser(socket.id);
        users.adduser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateuserList', users.getusersList(params.room));
        socket.emit('newMessage',  generateMessage('Admin', 'Welcome to our chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback();
    })

    socket.on('createMessage', (message, callback) => {
        let user = users.getuser(socket.id);

        if (user && isRealString(message.text)) { 
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback(); 
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getuser(socket.id);

        if (user) { 
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    })

    socket.on('disconnect', () => {
        let user = users.removeuser(socket.id);

        if (user) {
            io.to(user.room).emit('updateuserList', users.getusersList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
        }
    });
});


server.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});