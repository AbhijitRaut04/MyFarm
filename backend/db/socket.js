import { listener } from "../index.js";
import Chat from "../models/chat.models.js";
import Message from "../models/message.models.js";

const socketSetUp = (io) => {
    // io.on('connection', (socket) => {
    //     console.log('New client connected to /chat');
    
    //     socket.on('joinChat', ({ currentFarmerId, chatId }) => {
    //         const room = [currentFarmerId, chatId].sort().join('_');
    //         socket.join(room);
    //     });
    
    //     socket.on('sendMessage', async ({ currentFarmerId, chatId, sender, message }) => {
    //         const room = [currentFarmerId, chatId].sort().join('_');
    //         socket.to(room).emit('receiveMessage', { sender, message });
    
    //         let chat = await Chat.findById(chatId);
    
    //         if (!chat) {
    //             return res.status(404).send("Chat not found");
    //         } else {
    //             const message = await Message.create({
    //                 sender,
    //                 message
    //             })
    //             chat.messages.push(message);
    //         }
    
    //         await chat.save();
    //     });
    
    //     socket.on('disconnect', () => {
    //         console.log('Client disconnected from /chat');
    //     });
    // });
    // io.attach(listener);
}


export { socketSetUp }