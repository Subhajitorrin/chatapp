import React from "react";
import "./ChatList.css";
import UserInfo from "./UserInfo";
import List from "./List";

function ChatList({ user, setUpdate, setCurrentChatWith, setCurrentChatId,setToggleNewChat }) {
  return (
    <div className="chatlistContainer">
      <UserInfo user={user} setUpdate={setUpdate} />
      <List
        user={user}
        setCurrentChatWith={setCurrentChatWith}
        setCurrentChatId={setCurrentChatId}
        setToggleNewChat={setToggleNewChat}
      />
    </div>
  );
}

export default ChatList;
