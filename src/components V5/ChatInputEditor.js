import React, { useState, useContext } from "react";
import MessagesContext from "../contexts/messagesContext";
import { Button, InputGroup } from "@blueprintjs/core";
import "./chatInputEditor.css";

const ChatInputEditor = ({ user = {} }) => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  console.log("users sss : ", user);
  const [message, setMessage] = useState("");
  const [state, setState] = useContext(MessagesContext);

  const sendMessage = () => {
    let prevMsgs = { ...state };
    let loggedUserId = parseInt(loggedUser.id);
    let userId = parseInt(user.id);

    prevMsgs[userId].push({
      senderId: loggedUserId,
      message,
    });
    setState(prevMsgs);
    setMessage("");
  };

  console.log("message state changed", message);
  return (
    <div
      style={{
        padding: "0px 0px",
        flex: "1",
        display: "flex",
      }}
    >
      <InputGroup
        onChange={(e) => setMessage(e.target.value)}
        placeholder={"Enter Message..."}
        style={{ borderRadius: "7px" }}
        value={message}
        // className="bp4-input-group" , has its bydefault class.
      />
      <Button
        style={{ marginRight: "5px" }}
        onClick={() => sendMessage()}
        disabled={!message.length > 0}
      >
        Send
      </Button>
    </div>
  );
};

export default ChatInputEditor;
