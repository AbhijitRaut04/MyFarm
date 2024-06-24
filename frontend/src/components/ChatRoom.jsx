// src/ChatRoom.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { useFarmer } from '../context/FarmerContext';

const socket = io('http://localhost:3000');

const ChatRoom = () => {
    const { chatId } = useParams();
    const { farmerId, loading } = useFarmer();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (farmerId) {
                try {
                    const response = await axios.get(`api/chats/${farmerId}`);
                    const chat = response.data.filter(chat => chat._id === chatId);
                    setMessages(chat.messages);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            }
        };

        fetchMessages();

        socket.emit('joinChat', { chatId });

        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [chatId, farmerId]);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = { sender: farmerId, message };
            socket.emit('sendMessage', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Chat Room</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatRoom;
