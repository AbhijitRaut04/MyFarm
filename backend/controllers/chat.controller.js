import Chat from "../models/chat.models.js";
import Farmer from "../models/farmer.models.js";
import Message from "../models/message.models.js";

// create a new chat
const createChat = async (req, res) => {
    const farmer = req.farmer;
    try {
        let participants = req.body.participants;
        if(!participants.includes(farmer._id)) participants.push(farmer._id);
        let dp = (participants.length <= 2) ? participants[0].profilePhoto : req.body.imageUrl;
        let name = (participants.length <= 2) ? participants[0].username : req.body.groupName;
        const chat = await Chat.create({
            participants,
            dp,
            name
        })
        await Promise.all(participants.map(async (id) => {
            let temp = await Farmer.findById(id);
            temp.chats.push(chat._id);
            await Farmer.updateOne(
                {_id:id},
                {chats: temp.chats}
            )
        }))
        
        return res.status(200).send({ message: "Chat is created...", chat});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

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

// get Chat by id
const getChat = async (req, res) => {
    try {
        let chat = await Chat.findById(req.params.chatId);

        if(!chat.participants.includes(req.farmer._id)) return res.status(404).send("Unauthorised Chat access")
        
        chat.participants = await Promise.all(chat.participants.map(async id => {
            return await Farmer.findById(id).select("-password");
        }))

        chat.messages = await Promise.all(chat.messages.map(async id => {
            return await Message.findById(id);
        }))
            
        return res.status(200).send(chat);
    } catch (error) {
        return res.status(500).send(error);
    }
}

// view chat messages
const getMessagesFromChat = async (req, res) => {
    try {
        const farmer = req.farmer;
        if (!farmer.chats.includes(req.params.chatId)) return res.status(501).send("Unauthorised chat access");

        const chat = await Chat.findById(req.params.chatId)

        if (!chat) return res.status(404).send("Chat not found");

        const messagesList = await Promise.all(chat.messages.map(async (messageId) => {
            let message = await Message.findById(messageId)
            message.farmer = farmer;
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
        const chat = await Chat.findById(req.params.chatId)
    
        if (!chat) return res.status(404).send("Chat not found");

        const farmer = req.farmer;
        if (!farmer.chats.includes(req.params.chatId)) return res.status(501).send("Unauthorised chat access");


        const participantsList = await Promise.all(chat.participants.map(async (farmerId) => {
            const farmer = await Farmer.findById(farmerId)
            return farmer;
        }))

        res.status(200).json(participantsList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete chat
const deleteChat = async (req, res) => {
    const { chatId } = req.params;

    try {
        let chat = await Chat.findById(chatId);
        

        chat.messages.forEach(async (message) => {
            await Message.findByIdAndDelete(message);
        })
        chat.participants.forEach(async (id) => {
            let farmer = await Farmer.findById(id);
            farmer.chats = farmer.chats.filter(item => item != chatId)
            await Farmer.updateOne(
                {_id: id},
                {chats:farmer.chats}
            )
        }) 
        await Chat.findByIdAndDelete(chat._id);

        res.status(201).json({message : "Chat deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 

export { deleteChat, getChats, getMessagesFromChat, getParticipantsFromChat, createChat, getChat }