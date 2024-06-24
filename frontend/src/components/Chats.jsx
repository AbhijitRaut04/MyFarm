// src/Chats.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useFarmer } from '../context/FarmerContext';

const Chats = () => {
    const { farmerId, loading } = useFarmer();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            if (farmerId) {
                try {
                    const response = await axios.get(`/api/chats/`);
                    console.log(response)
                    setChats(response.data);
                } catch (error) {
                    console.error('Error fetching chats:', error);
                }
            }
        };

        fetchChats();
    }, [farmerId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>My Chats</h1>
            {chats.length > 0 ? (
                <ul>
                    {chats.map(chat => (
                        <li key={chat._id}>
                            <Link to={`/chats/${chat._id}`}>
                                Chat with {chat.participants.filter(member => member !== farmerId).join(', ')}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No chats available</p>
            )}
        </div>
    );
};

export default Chats;
