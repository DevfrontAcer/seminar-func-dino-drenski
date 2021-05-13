import React, { useState } from "react";

export default function Input({ onSendMessage }) {
  const [text, setText] = useState("");

  const onChange = (event) => {
    setText(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setText("");
    onSendMessage(text);
  };
  if (text === "") {
    return (
      <div>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            onChange={(e) => onChange(e)}
            value={text}
            type="text"
            placeholder="Send with enter or click Send button"
          />
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            onChange={(e) => onChange(e)}
            value={text}
            type="text"
            placeholder="Send with enter or click Send button"
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}
