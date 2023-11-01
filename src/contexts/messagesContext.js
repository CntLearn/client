import { createContext, useState } from "react";
import { messages } from "../utils/messages";
const MessagesContext = createContext();

const MessagesProvider = (props) => {
  const [state, setState] = useState(messages);
  return (
    <MessagesContext.Provider value={[state, setState]}>
      {props.children}
    </MessagesContext.Provider>
  );
};
export { MessagesProvider };
export default MessagesContext;
