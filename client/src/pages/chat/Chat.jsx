import React, { useState, useEffect } from 'react';
import './Chat.css';

import Navbar from "../../components/nav/Navbar";
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io("http://localhost:3000");

export default function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const sendername=sessionStorage.getItem("userName");
    const groupId=sessionStorage.getItem("groupId");
    
    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    useEffect(() => {
       
        const fetchMessages = async () => {
           
            try {
                const response = await axios.get(`http://localhost:3000/api/messages/group/${groupId}`);
                name=response.data.sendername;
                if (response.data.success) {
                    setMessages(response.data.messages);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim()) {
            const newMessage = {
                groupId: groupId, // Replace with actual group ID
                sendername: sendername, // Replace with actual sender ID
                text: message
            };

            try {
                await axios.post("http://localhost:3000/api/messages/send", newMessage);
                setMessage("");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <>
          <Navbar />
            <div className="chatcontent">
                <div className="chats">
                    {messages.map((msg, index) => (
                        <div key={index} className="chatmessage">
                            <p>{msg.sendername}</p>
                            <h3> {msg.text}</h3>
                            <p className='time'>{msg.timestamp}</p>
                
                        </div>
                    ))}
                </div>
                <div className="chatinput">
                    <button> <img src="/share.png" alt="share" /></button>
                    <input
                        type="text"
                        placeholder="Type Here.."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>
                        <img src="/send.png" alt="Send" />
                    </button>
                </div>
            </div>
        </>
    );
}