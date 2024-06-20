import { listener } from "../index.js";
import Chat from "../models/chat.models.js";

const socketSetUp = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected to /chat');
    
        socket.on('joinChat', ({ currentFarmerId, otherUserId }) => {
            const room = [currentFarmerId, otherUserId].sort().join('_');
            socket.join(room);
        });
    
        socket.on('sendMessage', async ({ currentFarmerId, otherUserId, sender, message }) => {
            const room = [currentFarmerId, otherUserId].sort().join('_');
            socket.to(room).emit('receiveMessage', { sender, message });
    
            let chat = await Chat.findOne({
                participants: { $all: [currentFarmerId, otherUserId] }
            });
    
            if (!chat) {
                return res.status(404).send("Chat not found");
            } else {
                chat.messages.push({ sender, message });
            }
    
            await chat.save();
        });
    
        socket.on('disconnect', () => {
            console.log('Client disconnected from /chat');
        });
    });
    io.attach(listener);
}


export { socketSetUp }