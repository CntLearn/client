import React, { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { getContacts } from "../services";

export default function Contact() {
  const contacts = getContacts();
  const [contact, setContact] = useState();
  const params = useParams();

  useEffect(() => {
    let contact = contacts.find(
      (contact, index) => index + 1 === parseInt(params.contactId)
    );
    setContact(contact);
  }, [params]);

  return (
    <div id="contact">
      <div>
        <img key={contact?.avatar} src={contact?.avatar || null} />
      </div>

      <div>
        <h1>
          {contact?.first || contact?.last ? (
            <React.Fragment>
              {contact?.first} {contact?.last} - {params?.contactId}
            </React.Fragment>
          ) : (
            <i>No Name</i>
          )}

          {<Favorite contact={contact ?? null} />}
        </h1>

        {contact?.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact?.notes && <p>{contact?.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  let favorite = contact?.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
