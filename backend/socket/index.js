import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import connectDB from '../db/connect.js';
import { deleteMessage, sendMessage, sendReaction } from '../controllers/message.controller.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinChat', ({ chatId }) => {
        const room = chatId;
        socket.join(room);
        // send message
        socket.on('sendMessage', (data) => {
            socket.to(room).emit('receiveMessage', data.message);
            
            sendMessage({data, chatId})
        });
        
        // delete message
        socket.on('deleteMessage', (messageId) => {
            socket.to(room).emit('receiveMessage', "This message deleted");
            
            deleteMessage({messageId, chatId});
        });
        
        // react to message
        socket.on("react", ({messageId, emoji, reactedBy}) => {
            socket.to(room).emit('receiveMessage', "Reaction added to message");
            
            sendReaction({messageId, emoji, reactedBy});
        })
        
    });


    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
