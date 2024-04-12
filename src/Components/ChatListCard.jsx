import React from "react";
import "./ChatListCard.css";

function ChatListCard() {
  return (
    <div className="ChatListCardContainer">
      <div className="itemImgContainer">
        <img
          src="https://pics.craiyon.com/2023-09-18/61b305a522014300b6699216384f8b51.webp"
          alt=""
        />
      </div>
      <div className="text">
        <span>Subhajit Ghosh</span>
        <p>This is last message</p>
      </div>
    </div>
  );
}

export default ChatListCard;
