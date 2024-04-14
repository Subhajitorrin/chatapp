import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import ChatList from "../Components/ChatList";
import Chat from "../Components/Chat";
import Details from "../Components/Details";

function Home({ user, setUpdate }) {
  const [currentChatWith, setCurrentChatWith] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);

  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1000);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handelMobileBack() {
    setCurrentChatId(null);
  }

  if (isMobileView) {
    return (
      <>
        {!currentChatId && (
          <div className="homeContainer">
            <div className="mobileChatList">
              <ChatList
                user={user}
                setUpdate={setUpdate}
                setCurrentChatWith={setCurrentChatWith}
                setCurrentChatId={setCurrentChatId}
                currentChatId={currentChatId}
              />
            </div>
            <div className="mobileChat">
              <Chat
                currentChatWith={currentChatWith}
                currentChatId={currentChatId}
                user={user}
              />
            </div>
          </div>
        )}{" "}
        {currentChatId && (
          <div className="homeContainer">
            <div className="mobileChatChatActive">
              <Chat
                currentChatWith={currentChatWith}
                currentChatId={currentChatId}
                user={user}
                handelMobileBack={handelMobileBack}
              />
            </div>
            <div className="mobileChatListActive">
              <ChatList
                user={user}
                setUpdate={setUpdate}
                setCurrentChatWith={setCurrentChatWith}
                setCurrentChatId={setCurrentChatId}
                currentChatId={currentChatId}
              />
            </div>
          </div>
        )}
      </>
    );
  } else {
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
        {/* <Details /> */}
      </div>
    );
  }
}

export default Home;
