import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login, SignUp } from "../components";
const PrivateRoute = () => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <SignUp />
        </Route>
        <Route path={`*`} exact>
          <div>Page Not Found</div>
        </Route>
      </Switch>
    </div>
  );
};

export default PrivateRoute;
