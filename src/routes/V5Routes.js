import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch }     from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  NavLink,
}                                       from "react-router-dom";
import { updateUserData }               from '../redux/auth';

import AuthContext  from "../contexts/authContext";
import PrivateRoute from "./PrivateRoute";
import PublicRoute  from "./PublicRoutes";

const RoutesV5 = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const dispatch = useDispatch();

  let auth = useSelector((state) => state.auth.isLogin)
  console.log('auth : ', auth)
  useEffect(() => {
    let loggedUser = JSON.parse(localStorage.getItem('user'));
    // user refresh the page and doesn't log out.. so update the redux data of the logged user.
    if (loggedUser?.token && !auth) {
      dispatch(updateUserData(loggedUser));
    }
  }, [])
  return (
    <React.Fragment>
      <Router>
        {
          auth ? <PublicRoute/> : <PrivateRoute/>
        }
      </Router>
    </React.Fragment>
  )
}

export default RoutesV5;
