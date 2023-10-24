import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  NavLink,
} from "react-router-dom";

import AuthContext from "../contexts/authContext";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoutes";

const log = console.log;

const RoutesV5 = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  log("authState : ", authState);

  return (
    <React.Fragment>
      <Router>{!authState ? <PrivateRoute /> : <PublicRoute />}</Router>
    </React.Fragment>
  );
};

export default RoutesV5;
