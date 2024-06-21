import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

const ChatComponent = ({ currentFarmerId, chatId }) => {
    const socket = useSocket();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [sender, setSender] = useState(''); // Adjust as necessary for your sender logic

    useEffect(() => {
        const room = [currentFarmerId, chatId].sort().join('_');
        socket.emit('joinChat', { currentFarmerId, chatId });

        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [socket, currentFarmerId, chatId]);

    const sendMessage = () => {
        const room = [currentFarmerId, chatId].sort().join('_');
        socket.emit('sendMessage', { currentFarmerId, chatId, sender, message: newMessage });
        setNewMessage('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;
