import React, { useEffect, useState, useContext } from "react";
import MessagesContext from "../contexts/messagesContext";

const ChatMessages = ({ user = {} }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log("currentUser", currentUser);
  const [userMessages, setUserMessages] = useState([]);
  const [state, setState] = useContext(MessagesContext);
  let userId = 0;
  useEffect(() => {
    if (!!user && user.id) {
      userId = parseInt(user.id);
      let msg = { ...state };
      let msgs = !!msg && msg[userId];
      setUserMessages(msgs);
    }
  }, [user, state.messages]);

  return (
    <div
      style={{
        height: "calc(100vh - 120px)",
        overflowY: "auto",
      }}
    >
      {!!userMessages &&
        userMessages.length > 0 &&
        userMessages.map((msg, index) => {
          return (
            <div
              key={index}
              style={
                msg.senderId == currentUser.id
                  ? {
                      textAlign: "right",
                      paddingRight: "10px",
                      backgroundColor: "rgb(164 175 169)",
                      // width: "50%",
                      marginTop: "10px",
                      padding: "7px",
                      borderRadius: "7px 1px 7px 7px",
                      wordBreak: "break-all",
                    }
                  : {
                      textAlign: "left",
                      backgroundColor: "rgb(59 125 109)",
                      // width: "50%",
                      marginTop: "10px",
                      padding: "7px",
                      borderRadius: "1px 7px 7px 7px",
                      wordBreak: "break-all",
                    }
              }
            >
              {msg.message}
            </div>
          );
        })}
    </div>
  );
};

export default ChatMessages;
