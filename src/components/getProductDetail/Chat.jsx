import React, { useState } from "react";
import io from "socket.io-client";
import "./ChatUI.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [showChat, setShowChat] = useState(false);

  const socket = io("http://localhost:5173");

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim() !== "") {
      socket.emit("chat message", messageInput);
      setMessageInput("");
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  socket.on("chat message", (message) => {
    console.log(message);
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  return (
    <>
      <div className={`chat-container ${showChat ? "show" : "hiden"}`}>
        <button
          className={showChat ? "toggle-chat-btn" : "btn-position"}
          onClick={toggleChat}
        >
          Chat with Admin
        </button>
        <div className="chat-window">
          <p style={{ textAlign: "center" }}>Chat with Admin</p>
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>
        <form onSubmit={handleMessageSubmit} className="message-input">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default Chat;
