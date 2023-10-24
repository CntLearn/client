import React from "react";

// crud blog

const SingleChatHeader = ({ user = {} }) => {
  return (
    <div
      style={{
        padding: "0px 10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h4>{!!user && user.name}</h4>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h5>messages</h5>
        <h5>participants</h5>
      </div>
    </div>
  );
};

export default SingleChatHeader;
