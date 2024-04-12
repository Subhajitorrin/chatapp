import React from "react";
import "./Message.css";

function Message({ isOwn }) {
  return (
    <div className={`messageContainer ${isOwn ? "own" : ""}`}>
      <div className="messageContainerImg">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6Nk8oBpDIyH0wNjXHm0-j8B6SiTwkDFE3PgM5pkLIw&s"
          alt=""
        />
      </div>
      <div className="msgtexts">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi atque iusto porro amet doloremque vero!
        </p>
        <span>1 min ago</span>
      </div>
    </div>
  );
}

export default Message;
