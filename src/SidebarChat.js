import React, { useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { useState } from "react";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, key, name, addnewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => 
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      db.collection("rooms").add({ name: roomName });
    } else {
      console.log("Yes we did not receive Room Name");
    }
  };

  return !addnewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`}
        />
        <div className="sideBarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h1>Add New Chat</h1>
    </div>
  );
}

export default SidebarChat;
