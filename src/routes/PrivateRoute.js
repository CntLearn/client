import React, { useEffect } from "react";
import { useSelector }                  from 'react-redux';
import { Switch, Route,useHistory } from "react-router-dom";
import { Login, SignUp }                from "../components";
const PrivateRoute = () => {
  const auth = useSelector((state)=>state.auth.isLogin);
  const history = useHistory();

  useEffect(()=>{
    if(!auth) history.push('/');
  },[])
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
