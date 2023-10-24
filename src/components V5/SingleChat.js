import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleChatHeader from "./SingleChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInputEditor from "./ChatInputEditor";

import "./chat.css";
const SingleChat = ({ contacts = [] }) => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    let usr = contacts.find((user) => user.id === id);
    setUser(usr);
  }, [id]);

  const fun = () => {
    <div class="chat-container">
      <div class="header">Username</div>
      <div class="messages">
        <div class="message">Message 1</div>
      </div>
      <div class="input-container">
        <input type="text" placeholder="Type your message" />
        <button>Send</button>
      </div>
    </div>;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#585c59",
      }}
    >
      <div
        style={{
          background: "#97bfa2",
        }}
      >
        <SingleChatHeader user={user} />
      </div>

      <div
        style={{
          background: "#c4ccc6",
          flex: 1,
          padding: "10px",
        }}
      >
        <ChatMessages user={user} />
      </div>
      <div
        style={{
          background: "#fcfcfc",
          display: "flex",
        }}
      >
        <ChatInputEditor user={user} />
      </div>
    </div>
  );
};

export default SingleChat;
