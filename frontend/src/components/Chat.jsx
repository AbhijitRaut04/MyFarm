import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ScrollContext } from "../context/Contexts";
import io from "socket.io-client";

const Chat = () => {

    useEffect(() => {
        const socket = io('http://localhost:5000');
        console.log("inside chat page")
        

        const fetchMessages = async () => {
            try {
              const response = await axios.get('http://localhost:5000/messages');
              setMessages(response.data);
            } catch (error) {
              console.error("Failed to fetch messages:", error);
            }
          };
      
          fetchMessages();
      
        
        
        socket.on('connection', (message) => {
          console.log(message);
        });
    
        // Step 4: Clean up on component unmount
        return () => {
          socket.disconnect();
        };
      }, []);
  
      


    const { setCalculateVisibility } = useContext(ScrollContext);
    useEffect(() => {
        setCalculateVisibility(0);
      return () => {
        setCalculateVisibility(1);
      };
    }, []);
    
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, input]);
    socket.emit('sendMessage', input);
    setInput("");
  };

  return (
    <ChatContainer>
      <Messages>
        {messages.map((message, index) => (
          <Message key={index}>{message}</Message>
        ))}
      </Messages>
      <MessageForm onSubmit={sendMessage}>
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <Button type="submit">Send</Button>
      </MessageForm>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 45px);
  height: auto;
  max-width: 600px;
  margin: auto;
  border: 1px solid #ccc;
  overflow: hidden;
  position: relative;
`;

const Messages = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 5px;
  background-color: #f3f3f3;
  border-radius: 5px;
`;

const MessageForm = styled.form`
  display: flex;
  bottom: 10px;
  padding: 10px;
  border-top: 1px solid #ccc;
  position: fixed;
  width: 600px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;
