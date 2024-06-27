import Chat from "../models/chat.models.js";
import Message from "../models/message.models.js";


const sendMessage = async ({newMessage, chatId}) => {
    try {
        let chat = await Chat.findById(chatId);
        if (!chat) {
            console.log("Chat not found");
            return "";
        } else {
            const newmessage = await Message.create(newMessage)
            chat.messages.push(newmessage._id);
        }

        await chat.save();
    }
    catch (error) {
        console.log(error);
    }
}


const deleteMessage = async ({ messageId, chatId }) => {
    try {
        let chat = Chat.findById(chatId);
        chat.messages = chat.messages.filter((item) => item != messageId);
        await chat.save();
        const message = await Message.findByIdAndDelete(messageId);
        if (!message) return "Message not found";
        else return "Message deleted";
    }
    catch (error) {
        console.log(error);
    }
}

// send reaction
const sendReaction = async ({ messageId, emoji, reactedBy }) => {
    try {
        let message = await Message.findById(messageId);
        if (!message) return "Message not found";
        message.reacts.push({
            reactedBy,
            emoji
        })
        await message.save();
    }
    catch (error) {
        console.log(error);
    }
}


export {
    sendMessage,
    deleteMessage,
    sendReaction
}