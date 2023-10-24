import React, { useState } from "react";
import "../style V5/chats.css";
import { Link, Switch, Route, useRouteMatch, NavLink } from "react-router-dom";

import SingleChat from "./SingleChat";
import { getContacts } from "../services";

const log = console.log;
const Chats = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const contacts = getContacts();
  const [name, setName] = useState("");

  let { path, url } = useRouteMatch();

  const getContactList = (contacts) => {
    let html = <div>Contacts Not Found</div>;
    let cont = contacts
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
      .map((chat) => {
        return (
          <div key={chat.id}>
            <li
              style={{
                textDecoration: "none",
              }}
            >
              <NavLink
                to={`${url}/${chat.id}`}
                style={{
                  textDecoration: "none",
                }}
                activeStyle={{ color: "blue" }}
              >
                <h3
                  style={{
                    margin: "0px",
                  }}
                >
                  {chat.id === user.id ? `${chat.name}  (YOU)` : chat.name}
                </h3>

                <p
                  style={{
                    margin: "0px",
                  }}
                >
                  {chat.lastMessage}
                </p>
              </NavLink>
            </li>
            <hr
              style={{
                width: "100%",
              }}
            />
          </div>
        );
      });

    return cont.length > 0 ? cont : html;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <nav
        style={{
          width: "200px",
          background: "#DCDCDC",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            listStyle: "none",
            padding: "10px",
            marginTop: "0px",
          }}
        >
          <div
            style={{
              position: "fixed",
              top: "1px",
              width: "198px",
              left: "100px",
            }}
          >
            <div>
              <input
                type="text"
                placeholder="search..."
                style={{
                  width: "100%",
                }}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: "40px",
            }}
          >
            {getContactList(
              name.length > 0
                ? contacts.filter((contact) =>
                    contact.name
                      .toLocaleLowerCase()
                      .includes(name.toLocaleLowerCase())
                  )
                : contacts
            )}
          </div>
        </ul>
      </nav>
      <div
        style={{
          flex: 1,
        }}
      >
        <Switch>
          <Route path={`${path}/:id`}>
            <SingleChat contacts={contacts} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Chats;
