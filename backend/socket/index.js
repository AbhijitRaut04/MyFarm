import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import Chat from '../models/chat.models.js';
import Message from '../models/message.models.js';

// Create an Express application
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));


// Determine the directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve the client file
// app.use(express.static(path.join(__dirname, 'public')));

// Create an HTTP server
const server = http.createServer(app);

// Create a Socket.IO server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

// Listen for client connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinChat', ({ currentFarmerId, chatId }) => {
        const room = [currentFarmerId, chatId].sort().join('_');
        socket.join(room);
    });

    socket.on('sendMessage', async ({ currentFarmerId, chatId, sender, message }) => {
        const room = [currentFarmerId, chatId].sort().join('_');
        socket.to(room).emit('receiveMessage', { sender, message });

        let chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).send("Chat not found");
        } else {
            const message = await Message.create({
                sender,
                message
            })
            chat.messages.push(message);
        }

        await chat.save();
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
