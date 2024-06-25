// src/ChatRoom.js
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { useFarmer } from "../context/FarmerContext";
import styled from "styled-components";
import { ScrollContext } from "../context/Contexts";

const ChatRoom = () => {
  const socket = io("http://localhost:3000");
  const { setCalculateVisibility } = useContext(ScrollContext);
  // const { farmerId, loading } = useFarmer();
  const [farmerId, setFarmerId] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { chatId } = useParams();

  useEffect(() => {
    setCalculateVisibility(0);
    const verifyToken = async () => {
      try {
        const response = await axios.get("/api/verify");
        console.log(response);
        setFarmerId(response.data.farmer.userId);
      } catch (error) {
        console.error("Error verifying token:", error);
      } finally {
        // setLoading(false); // Set loading to false after the request is complete
      }
    };

    verifyToken();
    return () => {
      setCalculateVisibility(1);
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (farmerId) {
        try {
          console.log(farmerId);
          console.log(chatId);
          const response = await axios.get(`/api/chats/messages/${chatId}`);
          console.log(response);
          // const chat = response.data.filter(chat => chat._id === chatId);
          // setMessages(chat.messages);
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();

    socket.emit("joinChat", { chatId });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatId, farmerId]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: farmerId, message };
      socket.emit("sendMessage", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  // if (loading) {
  //     return <div>Loading...</div>;
  // }

  return (
    <ChatContainer>
      {/* <h1>Chat Room</h1> */}
      <Messages>
        {messages.map((msg, index) => {
          if (msg.timestamp) {
            if (msg.sender === farmerId) {
              return (
                <FirstPerson key={index} style={{ textAlign: "right" }}>
                  <h2>{msg.message}</h2>
                  <p>{msg.timestamp.slice(11, 16)}</p>
                </FirstPerson>
              );
            } else {
              return (
                <SecondPerson key={index}>
                  <h2>{msg.message}</h2>
                  <p>{msg.timestamp.slice(11, 16)}</p>
                </SecondPerson>
              );
            }
          }
        })}

        {/* <Message key={index}>
                        <strong>{msg.sender}:</strong> {msg.message}
                    </Message>
                ))} */}
      </Messages>
      <MessageForm>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <Button onClick={sendMessage}>
          <i className="fa-solid fa-arrow-right"></i>
        </Button>
      </MessageForm>
    </ChatContainer>
  );
};

export default ChatRoom;

// const ChatContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: calc(100vh - 45px);
//   height: auto;
//   max-width: 600px;
//   margin: auto;
//   border: 1px solid #ccc;
//   overflow: hidden;
//   position: relative;

// `;

const ChatContainer = styled.div`
  background-color: #24c0c8;
  display: flex;
  /* flex-direction: column; */
  /* height: 100%; */
  width: auto;
  max-width: 600px;
  margin: auto;
  /* border: 1px solid #ccc; */
  /* overflow-y: auto; */
  position: relative;
  background-image: url("https://i.pinimg.com/736x/35/49/c5/3549c5b54d870c646ef66281103965e7.jpg");
  /* background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('https://i.pinimg.com/736x/35/49/c5/3549c5b54d870c646ef66281103965e7.jpg'); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  /* background-color: rgba(255,255,255,0.5); */
  /* background-blend-mode: overlay; */
`;

const Messages = styled.div`
  /* background-color: #1d9942; */
  width: 100%;
  flex-grow: 1;
  padding: 10px;
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 50px;
  h3 {
    font-family: "DM Sans", sans-serif !important;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
  }
  div {
    margin-bottom: 10px;
    padding: 2px 30px;
    padding-bottom: 4px;
    background-color: #bb3b3f;
    border-radius: 1.5rem;
    position: relative;
    display: flex;
    align-items: center;

    h2 {
      color: white;
    }
    p {
      position: absolute;
      color: #eed2d2;
      bottom: 3px;
      font-size: 0.5rem;
    }
  }
`;

const SecondPerson = styled.div`
  float: left;
  clear: both;
  width: min-content;
  max-width: 60%;
  border-bottom-left-radius: 0 !important;
  p {
    left: 1px;
    transform: translateX(50%);
  }
`;

const FirstPerson = styled.div`
  float: right;
  clear: both;
  width: min-content;
  max-width: 60%;
  border-bottom-right-radius: 0 !important;
  p {
    right: 1px;
    transform: translateX(-50%);
  }
`;
const MessageForm = styled.div`
  display: flex;
  /* padding: 10px; */
  /* border-top: 1px solid #ccc; */
  /* align-items: center; */
  /* background-color: #529fdb; */
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 600px;
  height: 50px;
  /* background-color: #bb3b3f; */
  padding: 0 2px;
  margin-bottom: 2px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  /* margin-right: 10px; */
  border: none;
  border-radius: 5rem;
  font-size: 1rem;
  /* margin-left: 2px; */
  margin-right: 1px;
  background-color: #ffffff;
  font-size: 1.5rem;
  padding-left: 30px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    padding: 20px;
    color: #bb3b3f;
    font-size: 1.3rem;
  }
  /* border: 1px solid #ccc; */
`;

const Button = styled.button`
  /* padding: 10px 20px; */
  width: 50px;
  height: 50px;
  font-size: 2rem;
  /* margin-right: 5px; */
  border: none;
  background-color: #c93237;
  color: white;
  border-radius: 50%;
  cursor: pointer;
`;
