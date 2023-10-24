import React, { useContext } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import { Home, About, Users, Chats } from "../components V5";
import TodoApp from "../Todo V5";
const mainRoutes = [
  {
    to: "/",
    name: "Home",
  },
  {
    to: "/about",
    name: "About",
  },
  {
    to: "/users",
    name: "users",
  },
  {
    to: "/chats",
    name: "Chats",
  },
  {
    to: "/todo",
    name: "Todo Task",
  },
  {
    to: "/test",
    name: "Not Found Test",
  },
];

const PublicRoute = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  const onLogOut = () => {
    localStorage.removeItem("user");
    setAuthState(null);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
      }}
    >
      <nav
        style={{
          width: "100px",
          // background: "#DCDCDC",
          background: "#f0f0f0",
          // display: "flex",
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            listStyle: "none",
            padding: "0px",
            alignItems: "center",
            margin: "0px",
            paddingTop: "10px",
          }}
        >
          {mainRoutes.map((menu, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={menu.to}
                  // exact={menu.to === "/home" && true}
                  style={{
                    textDecoration: "none",
                  }}
                  activeStyle={{ color: "blue", fontWeight: "bold" }}
                >
                  {menu.name}
                </NavLink>
              </li>
            );
          })}
          <li>
            <NavLink
              to={"/"}
              onClick={onLogOut}
              style={{
                textDecoration: "none",
              }}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
      <div
        style={{
          flex: 1,
        }}
      >
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/chats">
            <Chats />
          </Route>

          <Route path="/todo">
            <TodoApp />
          </Route>

          <Route path={`*`} exact>
            <div>Page Not Found</div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default PublicRoute;