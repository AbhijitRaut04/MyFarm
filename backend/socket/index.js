import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import Chat from '../models/chat.models.js';
import Message from '../models/message.models.js';
import connectDB from '../db/connect.js';

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
})
    socket.on('joinChat', ({ chatId }) => {
        const room = chatId;
        socket.join(room);
        socket.on('sendMessage', async ({ sender, message }) => {
            socket.to(room).emit('receiveMessage', { sender, message });
    
            let chat = await Chat.findById(chatId);
            if (!chat) {
                console.log("Chat not found");
                return "";
            } else {
                const newMessage = await Message.create({
                    sender,
                    message
                })
                chat.messages.push(newMessage);
            }
    
            await chat.save();
        });
    });
    

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

// });

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
