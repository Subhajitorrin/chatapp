import React, { useRef, useState } from "react";
import "./Home.css";
import ChatList from "../Components/ChatList";
import Chat from "../Components/Chat";
import Details from "../Components/Details";

function Home({ user, setUpdate }) {
  const [currentChatWith, setCurrentChatWith] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [toggleNewChat, setToggleNewChat] = useState(false);
  return (
    <div className="homeContainer">
      <ChatList
        user={user}
        setUpdate={setUpdate}
        setCurrentChatWith={setCurrentChatWith}
        setCurrentChatId={setCurrentChatId}
        setToggleNewChat={setToggleNewChat}
      />
      <Chat
        currentChatWith={currentChatWith}
        currentChatId={currentChatId}
        user={user}
        toggleNewChat={toggleNewChat}
      />
      <Details />
    </div>
  );
}

export default Home;
