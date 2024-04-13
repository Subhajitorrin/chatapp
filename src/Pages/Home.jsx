import React, { useRef, useState } from "react";
import "./Home.css";
import ChatList from "../Components/ChatList";
import Chat from "../Components/Chat";
import Details from "../Components/Details";

function Home({ user, setUpdate }) {
  const [currentChatWith, setCurrentChatWith] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);
  return (
    <div className="homeContainer">
      <ChatList
        user={user}
        setUpdate={setUpdate}
        setCurrentChatWith={setCurrentChatWith}
        setCurrentChatId={setCurrentChatId}
        currentChatId={currentChatId}
      />
      <Chat
        currentChatWith={currentChatWith}
        currentChatId={currentChatId}
        user={user}
      />
      <Details />
    </div>
  );
}

export default Home;
