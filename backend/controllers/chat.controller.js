import Chat from "../models/chat.models.js";
import Farmer from "../models/farmer.models.js";
import Message from "../models/message.models.js";

// get all chats
const getChats = async (req, res) => {
    const farmer = req.farmer;
    try {
        const chats = farmer.chats;
        const chatsList = await Promise.all(chats.map(async (chatId) => {
            const chat = await Chat.findById(chatId)
            return chat;
        }))
        res.status(200).json(chatsList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// view chat messages
const getMessagesFromChat = async (req, res) => {
    try {
        const farmer = req.farmer;
        if(!farmer.chats.includes(req.params.chatId)) return res.status(501).send("Unauthorised chat access");

        const chat = await Chat.findById(req.params.chatId)

        if(!chat) return res.status(404).send("Chat not found");

        const messagesList = await Promise.all(chat.messages.map(async (messageId) => {
            const message = await Message.findById(messageId)
            return message;
        }))

        res.status(200).json(messagesList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get participants of chat
const getParticipantsFromChat = async (req, res) => {
    try {
        const farmer = req.farmer;
        if(!farmer.chats.includes(req.params.chatId)) return res.status(501).send("Unauthorised chat access");

        const chat = await Chat.findById(req.params.chatId)

        if(!chat) return res.status(404).send("Chat not found");

        const participantsList = await Promise.all(chat.participants.map(async (farmerId) => {
            const farmer = await Farmer.findById(farmerId)
            return farmer;
        }))

        res.status(200).json(participantsList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const sendChat = async (req, res) => {
    const { chatId } = req.params;
    const { sender, message } = req.body;

    try {
        let chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).send("Chat not found");
        } else {
            chat.messages.push({ sender, message });
        }

        await chat.save();

        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { sendChat, getChats, getMessagesFromChat, getParticipantsFromChat }