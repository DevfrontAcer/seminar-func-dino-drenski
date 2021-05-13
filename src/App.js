import "./App.css";
import React, { useState, useEffect } from "react";
import sillyName from "sillyname";
import randomColor from "randomcolor";
import Messages from "./Components/Messages";
import Input from "./Components/Input";

function App() {
  const [userData, setUserData] = useState({
    messages: [],
    member: {
      username: sillyName(),
      color: randomColor(),
      id: null,
    },
  });
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    const drone = new window.Scaledrone("mKAKxYB9d2XZaXca", {
      data: userData.member,
    });
    setDrone(drone);
  }, [userData.member]);

  useEffect(() => {
    const droneEvents = () => {
      drone.on("open", (error) => {
        if (error) {
          return console.log(`We have an error: ${error}`);
        }

        userData.member.id = drone.clientId;
        setUserData({ ...userData }, userData.member);
        roomEvents();
        return console.log("Connected with a channel!");
      });
      drone.on("error", (error) => console.error(error));
      drone.on("disconnect", () => {
        console.log("Disconnected, wait for reconnect");
      });
      drone.on("reconnect", () => {
        console.log("Reconnected");
      });
    };

    const roomEvents = () => {
      const room = drone.subscribe("observable-room");
      room.on("open", (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Connected to room");
        }
      });
      room.on("message", (message) => {
        receiveMsg(message);
      });
    };
    const receiveMsg = (message) => {
      userData.messages.push(message);
      setUserData({ ...userData }, userData.messages);
    };

    if (drone && !userData.member.id) {
      droneEvents();
    }
  }, [drone, userData]);
  console.log(drone);

  return (
    <div className="App">
      <header>
        <div className="App-header">
          <h1>Algebra</h1>
        </div>
      </header>

      <Messages currentMember={userData.member} messages={userData.messages} />
      <Input
        onSendMessage={(message) => {
          drone.publish({ room: "observable-room", message });
        }}
      />
    </div>
  );
}

export default App;
