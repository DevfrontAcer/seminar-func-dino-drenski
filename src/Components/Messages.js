import React from "react";
import PropTypes from "prop-types";
import uniqId from "uniqid";

export default function Messages({ messages, currentMember }) {
  const renderMessage = (message) => {
    const { member, data, clientId } = message;
    if (clientId === currentMember.id) {
      return (
        <li className="sender" key={uniqId()}>
          <div className="Message-container">
            <div className="username">{member.clientData.username}</div>
            <div
              className="text"
              style={{ backgroundColor: member.clientData.color }}
            >
              {data}
            </div>
          </div>
        </li>
      );
    } else {
      return (
        <li className="reciver" key={uniqId()}>
          <div className="Message-container">
            <div className="username">{member.clientData.username}</div>
            <div
              className="text"
              style={{ backgroundColor: member.clientData.color }}
            >
              {data}
            </div>
          </div>
        </li>
      );
    }
  };

  return (
    <ul className="chat-container">{messages.map((m) => renderMessage(m))}</ul>
  );
}
Messages.propTypes = {
  messages: PropTypes.array,
};
