import React, { useEffect, useState } from "react";
import { Provider }                   from 'react-redux';
import store                          from './redux'
import { ToastContainer, Slide }             from 'react-toastify';
import io                             from "socket.io-client";
// import "./App.css";
import RoutesV5                       from "./routes/V5Routes";
import { AuthProvider }               from "./contexts/authContext";
import { MessagesProvider }           from "./contexts/messagesContext";
// const socket = io(`http://${window.location.hostname}:4000`);

// const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // listening...
    // socket.on("sendMessage", (messageFromServer) => {
    //   console.log(messageFromServer);
    // });
  }, []);

  const onSendBtn = () => {
    //emitting message or sending to the server.
    // socket.emit("sendMessage", message);
  };

  return (
    <React.Fragment>
      <Provider store={ store }>
        <AuthProvider>
          <MessagesProvider>
            <RoutesV5/>
          </MessagesProvider>
        </AuthProvider>
      </Provider>

      <ToastContainer
      transition={Slide}
      />

    </React.Fragment>

  );

  {
    // return <AppRoutes />;
    //   <div className="App">
    //   <input type={"text"} onChange={(e) => setMessage(e.target.value)}></input>
    //   <button onClick={() => onSendBtn()} disabled={!message}>
    //     Send
    //   </button>
    // </div>
  }
}

export default App;
