import React, { useEffect, useState } from "react";
import {
  Link,
  // Link, // this is not highlighted on active.
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { Dialog, DialogBody, DialogFooter, Button } from "@blueprintjs/core";

import Select from "react-select";

export function Root() {
  const { contacts, mainMenus } = useLoaderData();
  const [searchName, setSearchName] = useState("");
  const [allContact, setAllContact] = useState(contacts);
  const [dialog, setDialog] = useState({
    title: "Invite Friends",
    isOpen: false,
    canEscapeKeyClose: true,
    contact: { label: "Invite Friends", value: "" },
    isSelectSearchable: true,
  });
  const navigation = useNavigation();
  console.log(mainMenus);
  useEffect(() => {
    if (searchName.length > 0) {
      const filteredContacts = contacts.filter((contact) => {
        if (
          contact.first
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase()) ||
          contact.last
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())
        ) {
          return contact;
        }
      });

      setAllContact(filteredContacts);
    } else {
      setAllContact(contacts);
    }
  }, [searchName]);

  const onSubmitNewContact = (e) => {
    e.preventDefault();
    setDialog({ ...dialog, isOpen: true });
  };

  return (
    <React.Fragment>
      <Dialog
        style={{
          height: "300px",
          width: "40%",
        }}
        isOpen={dialog.isOpen}
        title={dialog.title}
        icon="add"
        onClose={() => setDialog({ ...dialog, isOpen: false })}
        canEscapeKeyClose={dialog.canEscapeKeyClose}
      >
        <DialogBody>
          <Select
            options={
              !!allContact &&
              allContact.map((contact) => {
                return {
                  label: contact.first + " " + contact.last,
                  value: contact,
                };
              })
            }
            value={dialog.contact}
            onChange={(e) => setDialog({ ...dialog, contact: e })}
            isSearchable={dialog.isSelectSearchable}
          />

          <p
            style={{
              marginTop: 30,
            }}
          >
            Note : It will be select list and the chosen contact name will
            receive email to join whatspp chat.
          </p>
        </DialogBody>
        <DialogFooter
          actions={
            <React.Fragment>
              <Button
                intent="primary"
                text="Close"
                onClick={() => setDialog({ ...dialog, isOpen: false })}
              />
              <Button intent="success" text="Send Mail" />
            </React.Fragment>
          }
        />
      </Dialog>

      <div id="sidebar">
        <h1>React Router Dom heading</h1>

        <div>
          {/*
<form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              onChange={(e) => setSearchName(e.target.value)}
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          */}

          <form onSubmit={(e) => onSubmitNewContact(e)}>
            <button type="submit">Invite</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Dashboard</NavLink>
            </li>
          </ul>

          {
            <ul>
              {!!mainMenus &&
                mainMenus.length > 0 &&
                mainMenus.map((menu, index) => {
                  return (
                    <li key={index}>
                      <NavLink to={`${menu.path}`}>{menu.name}</NavLink>
                    </li>
                  );
                })}
            </ul>
          }

          <ul>
            <li>Languages</li>
            <li>Dark || Light Theme</li>
            <li>Image/Logout</li>
          </ul>

          {allContact.length ? (
            <ul>
              {allContact.map((contact, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      to={`contacts/${index + 1}`}
                      className={({ isActive, isPending }) => {
                        return isActive ? "active" : isPending ? "pending" : "";
                      }}
                    >
                      {contact.first || contact.last ? (
                        <React.Fragment>
                          {contact.first} {contact.last} - {index + 1}
                        </React.Fragment>
                      ) : (
                        <i>No Name</i>
                      )}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </React.Fragment>
  );
}
