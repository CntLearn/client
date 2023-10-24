import { createContext, useState } from "react";
const AuthContext = createContext();

const AuthProvider = (props) => {
  let user = JSON.parse(localStorage.getItem("user"));

  const [state, setState] = useState(user);
  return (
    <AuthContext.Provider value={[state, setState]}>
      {props.children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;
